"use client"

import { Event, Filter, Pub, SimplePool, Sub } from "nostr-tools";
import React, { createContext, useState, useEffect, useContext } from "react";

const PoolContext = createContext({
  pool: {
    relays: [],
    sub: () => {},
    list: () => {},
    publish: () => {},
  },
});

// const pool = new SimplePool(); // Create the pool instance

const PoolProvider = ({ children }) => {
  const [pool, setPool] = useState(new SimplePool());

  useEffect(() => {
    setPool(new SimplePool()); // Recreate pool on every render for updates
  }, []);

  const relays = [
    "wss://relay.damus.io",
    "wss://relay.snort.social",
    "wss://eden.nostr.land",
    "wss://relay.nostr.info",
    "wss://offchain.pub",
    "wss://nostr-pub.wellorder.net",
    "wss://nostr.fmt.wiz.biz",
    "wss://nos.lol",
  ];

  const sub = (filters) => pool.sub(relays, filters);
  const list = (filters) => pool.list(relays, filters);
  const publish = (event) => pool.publish(relays, event);

  const value = { relays, sub, list, publish };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

const usePool = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export  { PoolProvider, usePool };
