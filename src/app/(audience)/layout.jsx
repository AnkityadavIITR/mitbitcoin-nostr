"use client"
import { NostrProvider } from "nostr-react";
import Navbar from "@/components/navbar";
const relayUrls = [
  "wss://relay.damus.io",
  "wss://relay.snort.social",
  "wss://nostr-pub.wellorder.net",
  "wss://relay.nostr.ch",
  "wss://nostr.jcloud.es",
];
export default function RootLayout({ children }) {
  return (
    <NostrProvider relayUrls={relayUrls} debug={true}>

    <main className="w-full h-full">
      <Navbar />
      {children}
    </main>
    </NostrProvider>


  );
}
