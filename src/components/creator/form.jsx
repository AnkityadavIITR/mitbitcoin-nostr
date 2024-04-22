"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import React from "react";
import { Button } from "../ui/button";
import lighthouse from "@lighthouse-web3/sdk";
import { nanoid } from "nanoid";
import { Eye, EyeOffIcon, Plus } from "lucide-react";
import { getEventHash, getPublicKey, signEvent } from "nostr-tools";
import { useNostr, dateToUnix } from "nostr-react";
import useData from "@/context/useData";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Form = () => {
  const { router } = useRouter();

  const [tags, setTags] = useState([]);
  const { setNostrKey, setCourseId } = useData();
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { publish } = useNostr();
  const [formUploaded, setFormSubmit] = useState(false);

  const handlePost = async (key) => {};
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };
  const uploadFile = async (file) => {
    const output = await lighthouse.upload(
      file,
      "1f7f27bc.44244a81b85448e39e78f0f0b875a9f1",
      false,
      null,
      progressCallback
    );

    return `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
  };

  const formik = useFormik({
    initialValues: {
      key: "",
      title: "",
      image: null,
      description: "",
      tags: [],
    },
    validationSchema: Yup.object({
      key: Yup.string().required("key is required"),
      title: Yup.string().required("Title is required"),
      image: Yup.mixed().required("A file is required"),
      description: Yup.string().required("Description is required"),
      tags: Yup.array().of(Yup.string()),
    }),
    onSubmit: async (values) => {
      // router.push("/creator/add/section");
      setLoading(true);
      // console.log(values);
      const res = await uploadFile(values.image);
      // console.log(res);
      setNostrKey(values.key);
      const id=nanoid()
      localStorage.setItem("courseId",id)
      const data = {
        id: id,
        courseTitle: values.title,
        thumbnailUrl: res,
        courseDescription: values.description,
        courseTags: values.tags,
      };

      setCourseId(id);

      const event = {
        content: JSON.stringify(data),
        kind: 1,
        tags: [],
        created_at: dateToUnix(),
        pubkey: getPublicKey(values.key),
      };

      event.id = getEventHash(event);
      event.sig = signEvent(event, values.key);

      try {
        publish(event);
        console.log("wait");
      } catch (e) {
        // setLoading(false);
      }
      setFormSubmit(true);
      console.log("je");
      setTimeout(() => {}, 2500);
    },
  });

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      formik.setFieldValue("tags", [...tags, tag]);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    formik.setFieldValue("tags", updatedTags);
  };

  const handleInputClick = () => {
    document.getElementById("image").click();
  };

  return (
    <div className="container mx-auto mt-8 max-w-[600px] mb-10">
      <h1 className="text-4xl font-bold mb-4">Submit your form</h1>
      {!formUploaded && (
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="key" className="block text-lg font-medium">
              nostr-key
            </label>
            <div className="flex relative">
              <input
                id="key"
                name="key"
                type="text"
                placeholder="nostr key"
                onChange={formik.handleChange}
                value={formik.values.key}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {/* {
              showKey==false ? <EyeOffIcon onClick={()=>setShowKey(true)} className=" absolute right-2"/>:<Eye onClick={()=>setShowKey(false)} className="absolute right-1"/> 
            } */}
            </div>

            {formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="course title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="w-full p-2 border border-gray-300 rounded"
            />

            {formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>
          <div className="flex gap-x-4">
            <div className="flex-1">
              <label htmlFor="image" className="block text-lg font-medium">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files;
                  formik.setFieldValue("image", file);
                }}
                className="w-full p-2 border border-gray-300 rounded hidden"
              />

              <Button
                variant="outline"
                className="w-full h-[85%]"
                onClick={handleInputClick}
              >
                <Plus />
              </Button>
              {formik.values.image && (
                <p className="text-green-400">file is selected</p>
              )}
              {formik.errors.image && (
                <div className="text-red-500 text-sm">
                  {formik.errors.image}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="description"
                className="block text-lg font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="course description"
                className="w-full p-2 border border-gray-300 rounded"
                rows={8}
              />
              {formik.errors.description && (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium">Tags</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(e.target.value);
                    e.target.value = "";
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-2 flex flex-wrap space-x-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex self-end">
            <Button
              type="submit"
              className="bg-customOrange rounded-none w-[200px]"
              // disabled={loading}
            >
              Create Course
            </Button>
          </div>
        </form>
      )}
      {formUploaded && <Link href={"/creator/add/section"} className="border rounded-md px-4 py-2 bg-customOrange text-white">Go Next</Link>}
    </div>
  );
};

export default Form;
