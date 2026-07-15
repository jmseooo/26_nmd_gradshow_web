/*
 * NetworkGraph — TypeScript port of the reference implementation.
 * Framework-agnostic, zero dependencies, standard Canvas 2D API.
 */

interface Options {
  nodeCount?: number;
  seed?: number;
  rotateSensitivity?: number;
  depth?: number;
  returnHome?: boolean;
  lineOpacity?: number;
  darkMode?: boolean;
}

interface NodeData {
  x: number; y: number; hx: number; hy: number;
  z: number; vx: number; vy: number;
  r: number; c: [number, number, number]; ck: string;
  sx?: number; sy?: number; sr?: number;
  sz?: number; _px?: number; _py?: number;
}

export class NetworkGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private opts: Required<Options>;
  private COLORS: Record<string, [number, number, number]>;
  private PALETTE: string[];
  private DARK_PALETTE: string[] = [];
  mouse: { x: number; y: number; nx: number; ny: number; active: boolean };
  private drag: number;
  private _rotNx = 0;
  private _rotNy = 0;
  private _useExternalRot = false;
  private W: number; private H: number; private t: number;
  private nodes: NodeData[] | null;
  private homes: { x: number; y: number }[] = [];
  private rNorm: number[] = [];
  private colorKeys: string[] = [];
  private zJitter: number[] = [];
  private EDGES: [number, number][] = [];
  private rest: number[] = [];
  private _count: number = 0;
  private _seed: number = 0;
  private _raf: number | null = null;
  private _onMove!: (e: PointerEvent) => void;
  private _onLeave!: () => void;
  private _onDown!: (e: PointerEvent) => void;
  private _onUp!: () => void;
  private _onResize!: () => void;

  constructor(canvas: HTMLCanvasElement, options: Options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.opts = Object.assign({
      nodeCount: 42, seed: 4, rotateSensitivity: 1,
      depth: 1, returnHome: false, lineOpacity: 0.32, darkMode: false,
    }, options) as Required<Options>;

    this.COLORS = {
      // light mode (on white background)
      teal:   [23, 149, 192],
      green:  [156, 200, 120],
      purple: [140, 129, 191],
      pink:   [236, 146, 145],
      yellow: [236, 226, 141],
      // dark mode (on dark blue background) — bright/light to contrast
      dk_blue:   [210, 248, 255],
      dk_white:  [240, 252, 255],
      dk_pink:   [255, 200, 210],
      dk_purple: [205, 198, 255],
      dk_green:  [195, 255, 175],
    };
    this.PALETTE = ['teal','teal','teal','teal','teal','teal','green','green','purple','purple','pink','pink','yellow'];
    this.DARK_PALETTE = ['dk_blue','dk_blue','dk_blue','dk_blue','dk_blue','dk_blue','dk_white','dk_pink','dk_pink','dk_purple','dk_purple','dk_green','dk_green'];
    this.mouse = { x: 0, y: 0, nx: 0, ny: 0, active: false };
    this.drag = -1;
    this.W = 0; this.H = 0; this.t = 0;
    this.nodes = null;
    this._bind();
  }

  setOptions(patch: Partial<Options>) { Object.assign(this.opts, patch); }

  // Public: update mouse from an external source (e.g. document-level listener)
  updateMouse(x: number, y: number, active: boolean) {
    this.mouse.x = x; this.mouse.y = y; this.mouse.active = active;
  }

  // External rotation control (bypasses cursor-position mapping)
  setRotationNormalized(nx: number, ny: number) {
    this._rotNx = nx; this._rotNy = ny; this._useExternalRot = true;
  }

  clearExternalRotation() { this._useExternalRot = false; }

  get isDraggingNode() { return this.drag >= 0; }

  private _rngFrom(seed: number) {
    let a = (seed * 2654435761) >>> 0;
    return () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  private _generateGraph(count: number, seed: number) {
    const rnd = this._rngFrom(seed * 97 + 3);
    this.homes = []; this.rNorm = []; this.colorKeys = []; this.zJitter = [];
    const hubs = Math.max(3, Math.round(count * 0.14));
    for (let i = 0; i < count; i++) {
      const isHub = i < hubs;
      const rad = Math.pow(rnd(), 0.7) * 0.48;
      const ang = rnd() * Math.PI * 2;
      this.homes.push({
        x: 0.5 + Math.cos(ang) * rad * (0.95 + rnd() * 0.1),
        y: 0.5 + Math.sin(ang) * rad * (0.92 + rnd() * 0.1),
      });
      this.rNorm.push(isHub ? 19 + rnd() * 7 : 12 + rnd() * 9);
      this.colorKeys.push(isHub
        ? (rnd() < 0.7 ? 'teal' : 'green')
        : this.PALETTE[(rnd() * this.PALETTE.length) | 0]);
      this.zJitter.push((rnd() - 0.5) * 0.9);
    }
    const seen = new Set<string>();
    this.EDGES = [];
    const add = (a: number, b: number) => {
      if (a === b) return;
      const k = a < b ? `${a}_${b}` : `${b}_${a}`;
      if (seen.has(k)) return;
      seen.add(k); this.EDGES.push([a, b]);
    };
    for (let i = 0; i < count; i++) {
      const d: [number, number][] = [];
      for (let j = 0; j < count; j++)
        if (j !== i) d.push([j, Math.hypot(this.homes[i].x - this.homes[j].x, this.homes[i].y - this.homes[j].y)]);
      d.sort((p, q) => p[1] - q[1]);
      add(i, d[0][0]);
      const pool = Math.min(d.length, i < hubs ? 9 : 6);
      const extra = i < hubs ? 3 : 1 + (rnd() < 0.4 ? 1 : 0);
      for (let e = 0; e < extra; e++) add(i, d[1 + ((rnd() * (pool - 1)) | 0)][0]);
    }
    for (let i = 0; i < count; i++) if (rnd() < 0.18) add(i, (rnd() * count) | 0);
    this._count = count; this._seed = seed;
  }

  private _layout(scale: number, W: number, H: number) {
    this.nodes = this.homes.map((h, i) => ({
      x: h.x * W, y: h.y * H, hx: h.x, hy: h.y,
      z: Math.max(-1.1, Math.min(1.1, ((this.rNorm[i] - 9) / 31) * 2 - 1 + this.zJitter[i])),
      vx: 0, vy: 0,
      r: this.rNorm[i] * scale,
      c: this.COLORS[this.colorKeys[i]] as [number, number, number],
      ck: this.colorKeys[i],
    }));
    this.rest = this.EDGES.map(([a, b]) =>
      Math.hypot(this.nodes![a].x - this.nodes![b].x, this.nodes![a].y - this.nodes![b].y));
  }

  private _bind() {
    const canvas = this.canvas;
    const pt = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    this._onMove = (e) => { const p = pt(e); this.mouse.x = p.x; this.mouse.y = p.y; this.mouse.active = true; };
    this._onLeave = () => { this.mouse.active = false; };
    this._onDown = (e) => {
      if (!this.nodes) return;
      const p = pt(e);
      let best = -1, bd = Infinity;
      for (let i = 0; i < this.nodes.length; i++) {
        const n = this.nodes[i];
        const d = Math.hypot((n.sx ?? n.x) - p.x, (n.sy ?? n.y) - p.y);
        if (d < (n.sr ?? n.r) + 12 && d < bd) { bd = d; best = i; }
      }
      if (best >= 0) { this.drag = best; canvas.setPointerCapture(e.pointerId); }
    };
    this._onUp = () => { this.drag = -1; };
    this._onResize = () => this._resize();
    canvas.addEventListener('pointermove', this._onMove);
    canvas.addEventListener('pointerleave', this._onLeave);
    canvas.addEventListener('pointerdown', this._onDown);
    canvas.addEventListener('pointerup', this._onUp);
    canvas.addEventListener('pointercancel', this._onUp);
    window.addEventListener('resize', this._onResize);
  }

  destroy() {
    if (this._raf !== null) cancelAnimationFrame(this._raf);
    const c = this.canvas;
    c.removeEventListener('pointermove', this._onMove);
    c.removeEventListener('pointerleave', this._onLeave);
    c.removeEventListener('pointerdown', this._onDown);
    c.removeEventListener('pointerup', this._onUp);
    c.removeEventListener('pointercancel', this._onUp);
    window.removeEventListener('resize', this._onResize);
  }

  start() {
    this._generateGraph(this.opts.nodeCount, this.opts.seed);
    this._resize();
    const loop = () => { this._raf = requestAnimationFrame(loop); this._tick(); };
    loop();
  }

  private _resize() {
    const canvas = this.canvas;
    const W = canvas.clientWidth, H = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = Math.min(W, H) / 850;
    if (!this.nodes) {
      this._layout(scale, W, H);
    } else {
      const rx = this.W ? W / this.W : 1, ry = this.H ? H / this.H : 1;
      const rr = Math.min(rx, ry);
      this.nodes.forEach((n, i) => { n.x *= rx; n.y *= ry; n.r = this.rNorm[i] * scale; });
      this.rest = this.rest.map(l => l * rr);
    }
    this.W = W; this.H = H;
  }

  private _tick() {
    const p = this.opts, W = this.W, H = this.H;
    if (!this.nodes) return;
    this.t += 1 / 60;
    if (p.nodeCount !== this._count || p.seed !== this._seed) {
      this._generateGraph(p.nodeCount, p.seed);
      this.nodes = null; this.drag = -1;
      this._resize();
    }
    const N = this.nodes!;
    const spring = 0.03, damp = 0.9;
    const structK = 0.02 + (p.returnHome ? 0.02 : 0);
    const tx = this._useExternalRot ? this._rotNx
      : (this.mouse.active ? (this.mouse.x / W - 0.5) : 0);
    const ty = this._useExternalRot ? this._rotNy
      : (this.mouse.active ? (this.mouse.y / H - 0.5) : 0);
    this.mouse.nx += (tx - this.mouse.nx) * 0.12;
    this.mouse.ny += (ty - this.mouse.ny) * 0.12;
    for (let i = 0; i < this.EDGES.length; i++) {
      const [a, b] = this.EDGES[i], na = N[a], nb = N[b];
      const dx = nb.x - na.x, dy = nb.y - na.y;
      const d = Math.hypot(dx, dy) || 0.001;
      const f = (d - this.rest[i]) / d * spring;
      na.vx += dx * f; na.vy += dy * f;
      nb.vx -= dx * f; nb.vy -= dy * f;
    }
    for (let i = 0; i < N.length; i++) {
      for (let j = i + 1; j < N.length; j++) {
        const a = N[i], b = N[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const min = a.r + b.r + 26;
        if (d < min) {
          const f = (min - d) / d * 0.045;
          a.vx -= dx * f; a.vy -= dy * f;
          b.vx += dx * f; b.vy += dy * f;
        }
      }
    }
    for (let i = 0; i < N.length; i++) {
      const n = N[i];
      n.vx += (n.hx * W - n.x) * structK;
      n.vy += (n.hy * H - n.y) * structK;
      n.vx *= damp; n.vy *= damp;
      n.x += n.vx; n.y += n.vy;
      const pad = n.r + 2;
      if (n.x < pad) { n.x = pad; n.vx *= -0.4; }
      if (n.x > W - pad) { n.x = W - pad; n.vx *= -0.4; }
      if (n.y < pad) { n.y = pad; n.vy *= -0.4; }
      if (n.y > H - pad) { n.y = H - pad; n.vy *= -0.4; }
    }
    if (this.drag >= 0) {
      const n = N[this.drag];
      n.x = this.mouse.x; n.y = this.mouse.y; n.vx = 0; n.vy = 0;
    }
    this._draw();
  }

  private _draw() {
    const ctx = this.ctx, N = this.nodes!, W = this.W, H = this.H, p = this.opts;
    ctx.clearRect(0, 0, W, H);
    const DEPTH = p.depth * Math.min(W, H) * 0.40;
    const FOCAL = Math.min(W, H) * 1.35;
    const CAM   = Math.min(W, H) * 0.20;
    const rs = p.rotateSensitivity;
    const yaw   = this.mouse.nx * Math.PI * 2 * rs;
    const pitch = this.mouse.ny * Math.PI * rs;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    let sumx = 0, sumy = 0;
    for (const n of N) {
      const wx = n.x - W / 2, wy = n.y - H / 2, wz = n.z * DEPTH;
      const x1 = wx * cy + wz * sy;
      const z1 = -wx * sy + wz * cy;
      const y1 = wy * cp + z1 * sp;
      const z2 = -wy * sp + z1 * cp;
      const persp = Math.min(FOCAL / (FOCAL - z2 - CAM), 1.2);
      const df = Math.max(-1, Math.min(1, z2 / DEPTH));
      n.sr = n.r * persp * (1 + df * 0.30);
      n._px = W / 2 + x1 * persp;
      n._py = H / 2 + y1 * persp;
      n.sz = z2;
      sumx += n._px!; sumy += n._py!;
    }
    const ox = W / 2 - sumx / N.length, oy = H / 2 - sumy / N.length;
    for (const n of N) {
      const m = n.sr! + 3;
      n.sx = Math.max(m, Math.min(W - m, n._px! + ox));
      n.sy = Math.max(m, Math.min(H - m, n._py! + oy));
    }
    const lo = p.lineOpacity;
    const dark = p.darkMode;
    // dark mode: map light-palette key → bright-palette key
    const DM: Record<string, string> = { teal: 'dk_blue', green: 'dk_green', purple: 'dk_purple', pink: 'dk_pink', yellow: 'dk_white' };
    ctx.lineCap = 'round';
    const baseLW = Math.max(0.6, Math.min(W, H) / 850 * (dark ? 1.8 : 0.85));
    for (const [a, b] of this.EDGES) {
      const na = N[a], nb = N[b];
      const md = (na.sz! + nb.sz!) / (2 * DEPTH);
      const shade = Math.max(0, Math.min(1, (md + 1) / 2));
      ctx.strokeStyle = dark
        ? `rgba(255,255,255,${lo * (0.35 + 0.55 * shade)})`
        : `rgba(120,170,196,${lo * (0.25 + 0.6 * shade)})`;
      ctx.lineWidth = baseLW * (0.7 + 0.6 * shade);
      ctx.beginPath();
      ctx.moveTo(na.sx!, na.sy!); ctx.lineTo(nb.sx!, nb.sy!);
      ctx.stroke();
    }
    const order = N.map((_, i) => i).sort((a, b) => N[a].sz! - N[b].sz!);
    for (const i of order) {
      const n = N[i];
      const t = Math.max(0, Math.min(1, (n.sz! / DEPTH + 1) / 2));
      const [r, g, bl] = dark ? (this.COLORS[DM[n.ck] ?? n.ck] ?? n.c) : n.c;
      const mix = 0.55 + 0.45 * t;
      // dark: blend toward background blue; light: blend toward white
      const bg = dark ? [10, 153, 209] : [255, 255, 255];
      const R = Math.round(bg[0] + (r - bg[0]) * mix);
      const G = Math.round(bg[1] + (g - bg[1]) * mix);
      const B = Math.round(bg[2] + (bl - bg[2]) * mix);
      if (t > 0.55) {
        ctx.shadowColor = `rgba(${r},${g},${bl},0.28)`;
        ctx.shadowBlur = n.sr! * 0.5;
        ctx.shadowOffsetY = n.sr! * 0.18;
      } else { ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; }
      ctx.beginPath();
      ctx.fillStyle = `rgb(${R},${G},${B})`;
      ctx.arc(n.sx!, n.sy!, Math.max(0.5, n.sr!), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  }
}
