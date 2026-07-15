import { supabase, type GuestMessage } from "@/lib/supabase";
import GuestbookClient from "./GuestbookClient";

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
