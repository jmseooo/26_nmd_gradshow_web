import { supabase, type GuestMessage } from "@/lib/supabase";
import GuestbookClient from "./GuestbookClient";

// 방명록은 새 글이 계속 올라오므로 요청마다 최신 데이터를 가져온다.
// (기본값인 정적 생성으로 두면 배포 시점의 목록이 그대로 굳어버림)
export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;

export default async function GuestbookPage() {
  const { data } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  const initialMessages: GuestMessage[] = data ?? [];
  const initialHasMore = initialMessages.length === PAGE_SIZE;
  const initialCursor = initialMessages.at(-1)?.created_at ?? null;

  return (
    <GuestbookClient
      initialMessages={initialMessages}
      initialHasMore={initialHasMore}
      initialCursor={initialCursor}
    />
  );
}
