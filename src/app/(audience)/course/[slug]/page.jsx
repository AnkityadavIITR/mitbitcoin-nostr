"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/course/Hero";
import { useParams } from "next/navigation";
import { data } from "@/app/(audience)/page";
import CourseContent from "@/components/course/courseContent";
import SubscribeBanner from "@/components/home/subscription";
import Footer from "@/components/footer";
import InstructorProfile from "@/components/course/instructorProfile";

const Course = () => {
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null);
  console.log(slug);
  useEffect(() => {
    const res = data.find((data) => data.id === slug);
    setCourseData(res);
  }, [slug]);
  return (
    <div className="m-0 p-0">
      <Hero courseData={courseData} />
      <CourseContent />
      <InstructorProfile/>
      <SubscribeBanner/>
      <Footer/>
    </div>
  );
};

export default Course;
