"use client";
import React from "react";
import { useNostrEvents } from "nostr-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const PersonalFeed = () => {
  const { events } = useNostrEvents({
    filter: {
      authors: [
        "75a71121ae1d67a6fbbd4013077e05ae7e8fbeff9e644d97220ed7bd074cbb69",
      ],
      since: 0,
      kinds: [1],
    },
  });
  console.log(events);
  return (
    <div>
      {/* <h2 className="text-xl font-bold mt-4">Global Feed</h2> */}
      <Accordion type="single" collapsible className="w-full">
        {events.map((event) => {
          try {
            const parsedContent = JSON.parse(event.content);
            if (
              parsedContent &&
              typeof parsedContent === "object" &&
              "courseId" in parsedContent
            ) {
              const data = JSON.parse(event.content);
              console.log(data);
              return (
                <div className="mx-auto container" key={data.courseId}>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{data?.title}</AccordionTrigger>
                      <AccordionContent>{data?.description}</AccordionContent>
                      <AccordionContent>
                        <Link href={data?.videoUrl} className="underline text-blue">Video link</Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          return null;
        })}
      </Accordion>
    </div>
  );
};

export default PersonalFeed;
