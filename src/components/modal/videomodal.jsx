"use client";
import { motion, AnimatePresence } from "framer-motion";


function VideoModal({ showUploadModal, setShowUploadModal }) {

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
          onClick={() =>{
            if(!loading)
             setShowUploadModal(false)}
          }
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

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VideoModal;
