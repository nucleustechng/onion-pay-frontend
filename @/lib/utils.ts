import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function checkFileSize(file: File) {
  const sizeInKB = file.size / 1024;
  return sizeInKB <= 150;
}
