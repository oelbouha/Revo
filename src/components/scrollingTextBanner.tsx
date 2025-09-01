import React from "react";
import { motion } from "framer-motion";

const ScrollingTextBanner = () => {
  const items = [
    "Events & PR",
    "Strategy", 
    "Operational",
    "Audiovisual Production",
    "Digital & Social Media",
  ];

  const repeatedText = (items.join(" • ") + " • ").repeat(4);

  return (
    <div className="w-full h-12 md:h-16 bg-[#4D4D4D] border border-[#707070] overflow-hidden relative flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-25%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        <span className="text-white text-xl font-medium">{repeatedText}</span>
      </motion.div>
    </div>
  );
};

export default ScrollingTextBanner;