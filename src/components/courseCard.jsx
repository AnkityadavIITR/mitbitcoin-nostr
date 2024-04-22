import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const CourseCard = ({ onClick, data }) => {
  console.log(data);
  return (
    <Card className="max-w-[300px] " onClick={() => onClick(data.id)}>
      <div className="overflow-hidden">
        <Image
          src={data?.thumbnailUrl ? data.thumbnailUrl : "/Images/course.jpg"}
          width={300}
          height={200}
          className="object-contain scale-125"
        ></Image>
      </div>

      <CardContent className="pt-2">
        <h1 className=" text-black text-[16px] font-semibold max-w-[300px] text-wrap">
          {data.courseTitle || data.courseHeading}
        </h1>
        <h3 className="text-slate-500 text-[14px]">{data.courseInstructor}</h3>
        <h4>Price: {data.price ? data.price : "10000 Sats"}</h4>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
