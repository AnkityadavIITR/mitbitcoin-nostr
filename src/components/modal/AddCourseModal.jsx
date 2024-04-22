"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getEventHash, getPublicKey, signEvent } from "nostr-tools";
import { useNostr, dateToUnix } from "nostr-react";
import useData from "@/context/useData";

function AddCourseModal({ showUploadModal, setShowUploadModal }) {
  const [loading, setLoading] = useState(false);
  const { publish } = useNostr();
  const courseId = localStorage.getItem("courseId");

  const formik = useFormik({
    initialValues: {
      key: "",
      title: "",
      description: "",
      videoUrl: "",
    },
    validationSchema: Yup.object({
      key: Yup.string().required("key is required"),
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      videoUrl: Yup.string().url("Must be a valid URL"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const data = {
        courseId: courseId,
        title: values.title,
        description: values.description,
        videoUrl: values.videoUrl,
      };

      console.log(data);

      const event = {
        content: JSON.stringify(data),
        kind: 1,
        tags: [],
        created_at: dateToUnix(),
        pubkey: getPublicKey(values.key),
      };

      event.id = getEventHash(event);
      event.sig = signEvent(event, values.key);
      publish(event);
      setShowUploadModal(false);
    },
  });

  return (
    <AnimatePresence>
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={() => {
            if (!loading) setShowUploadModal(false);
          }}
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            style={{
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            }}
            className="min-w-[30%] bg-white px-5 py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-lg mx-auto"
              >
                <div className="mb-6">
                  <label
                    htmlFor="key"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    nostr-key
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="key"
                    value={formik.values.key}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="nostr-key"
                    className="w-full border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.key && formik.errors.key && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.key}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Section Title"
                    className="w-full border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.title}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Section description"
                    className="w-full h-24 border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="videoUrl"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Video URL
                  </label>
                  <input
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    value={formik.values.videoUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full  border-slate-600 border px-4 py-2  shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.videoUrl && formik.errors.videoUrl && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.videoUrl}
                    </div>
                  )}
                </div>

                {/* Video File */}

                <div className="flex self-end">
                  <Button
                    type="submit"
                    className="bg-customOrange rounded-none w-[200px]"
                    disabled={loading}
                  >
                    Upload Section
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddCourseModal;
