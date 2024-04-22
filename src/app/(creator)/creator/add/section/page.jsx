"use client";
import AddSectionHero from "@/components/course/AddCourseSectionHero";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddCourseModal from "@/components/modal/AddCourseModal";
import PersonalFeed from "@/components/personfeed";
import useData from "@/context/useData";
import VideoModal from "@/components/modal/videomodal";
const AddCourse = () => {
  const { courseId } = useData();
  console.log(courseId);

  const [sectionArray, setSectionArray] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVideo,setShowVideo]=useState(false);
  const [link,setLink]=useState(null);

  const handleClick=(link)=>{

  }
  return (
    <div>
      <div>
        <AddSectionHero />
      </div>
      <div className="px-[150px]">
        <div className="container mt-10 mx-auto pr-0 pl-0">
          <h1 className="text-[40px] font-bold font-tertiary ">
            Add to Courses
          </h1>
          <hr className="border-t-4 border-slate-600" />
        </div>
        <div className="container mt-5 mx-auto flex self-end mb-5">
          <Button onClick={() => setShowUploadModal(true)}>Add section</Button>
        </div>
      </div>
      <PersonalFeed setShowVideo={setShowVideo}/>
      {showUploadModal && (
        <AddCourseModal
          showUploadModal={showUploadModal}
          setShowUploadModal={setShowUploadModal}
        />
      )}
      {
        showVideo && (
          <VideoModal setShowVideo={setShowVideo} link={link}/>
        )
      }
    </div>
    )
};

export default AddCourse;
