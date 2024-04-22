"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import CourseCard from "@/components/courseCard";
import { useRouter } from "next/navigation";
import Hero from "@/components/home/hero";
import CourseCarousel from "@/components/home/courseCarousel";
import SubscribeBanner from "@/components/home/subscription";
import Footer from "@/components/footer";
import GlobalFeed from "@/components/globalFeed";
import { useState } from "react";

export const data = [
  {
    id: "1",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
  {
    id: "2",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
  {
    id: "3",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
  {
    id: "4",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
];

export default function Home() {
  const router = useRouter();
  const handleClick = (id) => {
    console.log("click");
    router.push(`/course/${id}`);
  };

  return (
    <main className="">
      <Hero />
      <div className="container  pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <GlobalFeed />
      </div>
      <div className="container  pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3 ">
        <h1 className="text-[40px] font-bold font-tertiary">Top Courses</h1>
        <hr className="width-[2px]" />
        <CourseCarousel data={data} />
      </div>

      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">
          Bitcoin for everyone
        </h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">Bitcoin for Dev</h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">
          Bitcoin for Lightening
        </h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">Nostr</h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <SubscribeBanner />
      <Footer />
    </main>
  );
}
