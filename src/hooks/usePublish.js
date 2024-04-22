"use client"

import { Event, getEventHash, signEvent, UnsignedEvent } from 'nostr-tools';

import { useAuth } from "@/context/useAuth";
import { usePool } from "@/context/usePool";

const usePublish = () => {
    const { user, publicKey, privateKey, loginWithPublicKey, logout } = useAuth();
    const {relays, sub, list, publish} = usePool();

  const userData = user;

  return ({ content, kind, tags }) => {
    return new Promise(async (resolve, reject) => {
      const pubkey = userData
        ? userData.publicKey
        :  '';
      const pk = userData ? userData.privateKey : '';

      if (!pubkey) {
        reject(new Error('No public key provided'));
      }

      const unsignedEvent = {
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        content: JSON.stringify(content) || '',
        tags: tags || [],
        kind,
      };

      const signedEvent = pk
        ? {
            ...unsignedEvent,
            id: getEventHash(unsignedEvent),
            sig: signEvent(unsignedEvent, pk),
          }
        :  {};

      if (!signedEvent.sig) {
        reject(new Error('No signature provided'));
      }

      const pub = publish(signedEvent);

      pub.on('ok', () => {
        resolve(signedEvent);
      });
    });
  };
};

export default usePublish;
