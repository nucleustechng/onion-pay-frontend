import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Logo from "../../../Assets/logo/OnionPayLogo.svg";
import SidebarComponent from "../SidebarComponent";

const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={toggleSheet}
        className="flex lg:hidden fixed top-5 right-5 z-30 text-primary p-3  "
      >
        <HamburgerMenuIcon className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={closeSheet}
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-30 bg-white shadow-lg p-5"
              style={{ width: "300px" }}
            >
              <div className="flex justify-between items-center">
                <Image
                  src={Logo}
                  width={123}
                  height={30}
                  alt="Onion Pay Logo"
                />
                <button
                  onClick={toggleSheet}
                  className="text-primary p-2 rounded-full"
                >
                  <XIcon />
                </button>
              </div>
              <div className="overflow-y-auto h-full pb-36">
                <SidebarComponent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationSheet;
