import Link from "next/link";
import React from "react";

interface Props {
  header?: string;
  linkArray: { mainText: string; route?: string }[];
  extend?: boolean;
  row?: boolean;
}

const FooterItem = ({ header, linkArray, row }: Props) => {
  return (
    <div>
      <div
        className={`flex flex-col gap-4 ${row ? "lg:flex lg:flex-row lg:gap-12" : ""}`}
      >
        {header && (
          <h1 className="text-white text-2xl font-WorkSans font-medium leading-7 mb-2">
            {header}
          </h1>
        )}
        {linkArray.map((item: any) => (
          <ul key={item.mainText} className={`w-[11.975rem]`}>
            {item.route ? (
              <Link href={item.route}>
                <li className="text-white text-base font-WorkSans font-normal">
                  {item.mainText}
                </li>
              </Link>
            ) : (
              <li className="text-white text-base font-WorkSans font-normal">
                {item.mainText}
              </li>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FooterItem;
