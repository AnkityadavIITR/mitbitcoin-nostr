import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const InstructorProfile = () => {
  return (
    <div className="py-12 px-[150px] mt-10 mb-10">
      <div className="container pr-0 pl-0 mx-auto flex justify-between max-w-4xl">
        <Image
        src={"/"}
        width={200}
        height={200}
        className="border rounded-full"
        />
        <div className="flex flex-col w-[50%] gap-5">
          <h1 className="text-customOrange text-[40px] font-bold font-tertiary">About Instructor</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            accumsan, nunc sit amet efficitur convallis, augue orci placerat
            magna, eget congue orci massa a sapien.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
