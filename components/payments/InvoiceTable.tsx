import React, { useEffect, useState } from "react";

interface Props {
  // description:string,
  amount: string;
  paymentId: string;
  date: any;
  status: string;
  createdOn: any;
  clientName: string;
  email: string;
}

const InvoiceTable = ({
  status,
  date,
  amount,
  createdOn,
  clientName,
}: Props) => {
  const slicedAmount = amount.slice(1);
  useEffect(() => {
    // function formatAMPM(date: Date) {
    //   let hours = date.getHours();
    //   let minutes: any = date.getMinutes();
    //   const ampm = hours >= 12 ? 'PM' : 'AM';
    //   hours = hours % 12;
    //   hours = hours ? hours : 12; // the hour '0' should be '12'
    //   minutes = minutes < 10 ? '0' + minutes : minutes;
    //   const strTime = hours + ':' + minutes + ' ' + ampm;
    //   return strTime;
    // }
    if (status == "Successful") {
      const new_date = new Date(date ? date : "");

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

      const formattedDate = `${months[new_date.getMonth()]} ${new_date.getDate()}, ${new_date.getFullYear()} `;
      setMydate(formattedDate);
    } else {
      const formatDate = (timestamp: {
        _seconds: number;
        _nanoseconds: number;
      }): string => {
        const new_date = timestamp
          ? new Date(
              timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000,
            )
          : null;
        const formattedDate = new_date
          ? new_date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              // hour: 'numeric',
              // minute: 'numeric',
              // hour12: true,
            })
          : "";
        return formattedDate;
      };

      const convertedDate = formatDate(createdOn);
      setMydate(convertedDate);
    }
  }, [createdOn, date, status]);

  const [myDate, setMydate] = useState<string>("");

  return (
    <div>
      <div className="flex items-center px-4 w-[71.5rem] h-16">
        <div className="w-[17rem] md:w-[22.5rem]">
          <h1>{clientName}</h1>
        </div>
        {/* <div className='w-[22.5rem]'>
              <h1>{email}</h1>
            </div> */}
        {/* <div className='w-[22.5rem]'>
              <h1>{paymentId}</h1>
            </div> */}
        <div className="w-[10.45rem]">
          <h1>NGN {slicedAmount}</h1>
        </div>
        {/* <div className='w-[9.4rem]'>
              <h1>Card</h1>
            </div> */}
        <div className="w-[18.8rem]">
          <h1>{myDate}</h1>
        </div>
        <div className="w-[10.45rem]">
          <div className="flex items-center   w-[6.65rem] h-[1.71rem] rounded-lg ">
            <h1
              className={`${status == "Successful" ? "text-[#61A72C]" : "text-[#FF9635]"} text-base font-WorkSans font-normal leading-4`}
            >
              {status}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
