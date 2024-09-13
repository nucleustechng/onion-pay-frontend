import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function formatDate(timestamp: any) {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

export const formatDate = (dateString: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  // const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  // const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  // const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
  const formattedDate = `${month} ${day}, ${year}  `;
  return formattedDate;
};

export function checkFileSize(file: File | null) {
  // return file?.name?.split('.').pop();
  // console.log()

  if (file) {
    const sizeInKB = file.size / 1024;
    return sizeInKB <= 150;
  } else {
    return;
  }
}

import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
}
