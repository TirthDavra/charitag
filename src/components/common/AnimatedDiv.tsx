"use client";
import React from "react";
import { motion } from "framer-motion";

export const AnimatedDiv = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any; // Define prop types
}) => {
  return (
    <motion.div
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, height: "auto" },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
      className={`${children && children?.toString().length > 0 ? " my-2": "my-0"}  ml-6 flex flex-col space-y-2 text-[14px]`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const HoverAnimationDiv = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any; // Define prop types
}) => {
  return (
    <motion.div
      {...rest} // Forward all additional props to motion.div
      className="flex flex-grow cursor-pointer items-center justify-between"
      whileHover={{ scale: 1.06 }} // Example hover effect
    >
      {children}
    </motion.div>
  );
};
