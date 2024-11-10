"use client";

import { Divider } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ children, navItem, setNavItem }) => {
  const router = useRouter();
  return (
    <div className="responsive-layout flex flex-col md:flex-row mt-20 md:h-[650px]">
      <aside className="flex flex-row gap-2 md:flex-col border-r-2 self-stretch justify-start md:justify-center">
        <div
          onClick={() => {
            setNavItem("Order");
          }}
          className={`flex items-center font-medium gap-1 w-fit px-0.5 md:px-10 py-3 cursor-pointer text-[#5C5F6A] ${
            navItem == "Order" && " bg-[#F6F6F6] rounded-lg text-black"
          }`}
        >
          <img src="/order.png" alt="" className="hidden md:inline-block" />
          Orders
        </div>
        <div
          onClick={() => {
            setNavItem("Addr");
          }}
          className={`flex items-center font-medium gap-1 w-fit px-0.5 md:px-10 py-3 cursor-pointer text-[#5C5F6A] ${
            navItem == "Addr" && " bg-[#F6F6F6] rounded-lg text-black"
          }`}
        >
          <img src="/Delivery.png" alt="" className="hidden md:inline-block" />
          Address
        </div>
        {/* <div
          onClick={() => {
            setNavItem("Pass");
          }}
          className={`flex items-center font-medium gap-1 px-10 py-3 cursor-pointer text-[#5C5F6A] ${
            navItem == "Pass" && " bg-[#F6F6F6] rounded-lg text-black"
          }`}
        >
          <img src="/Key.png" alt="" />
          Password
        </div> */}
        {/* <div
          onClick={() => {
            setNavItem("Detail");
          }}
          className={`flex items-center font-medium gap-1 px-10 py-3 cursor-pointer text-[#5C5F6A] ${
            navItem == "Detail" && " bg-[#F6F6F6] rounded-lg text-black"
          }`}
        >
          <img src="/ProfileUser.png" alt="" />
          Account Detail
        </div> */}
        <div
          onClick={async () => {
            try {
              Cookies.remove("userId");
              if (!Cookies.get("userId")) router.push("/login");
            } catch (e) {
              console.log(e);
            }
          }}
          className={`flex items-center font-medium gap-1 px-0.5 md:px-10 py-3 cursor-pointer text-[#5C5F6A] ${
            navItem == "Logout" && " bg-[#F6F6F6] rounded-lg text-black"
          }`}
        >
          <img src="/Logout.png" alt="" className="hidden md:inline-block" />
          Logout
        </div>
      </aside>
      <Divider className="md:hidden" />
      {children}
    </div>
  );
};

export default Sidebar;
