"use client";

import React, { useContext, useState } from "react";
import { web_link } from "@/config_var";
import { useRouter } from "next/navigation";
import { FilterDispatch } from "@/context/Context";
import Cookies from "js-cookie";

const Navbar = () => {
  const setBookFilter = useContext(FilterDispatch);
  const router = useRouter();
  const [searchBook, setSearchBook] = useState("");
  const [showNav, setShowNav] = useState(false);

  if (router.pathname === `${web_link}/manage`) {
    return <></>;
  }

  return (
    <nav className="flex items-center py-5 responsive-layout shadow-md justify-between ">
      <div className="flex items-center gap-2 font-bold text-2xl">
        <img
          src="https://static.vecteezy.com/system/resources/previews/024/049/007/non_2x/computer-pc-icon-logo-design-vector.jpg"
          alt=""
          className="w-12 h-12"
        />
        CompMart
      </div>
      <div className="hidden lg:flex xl:flex items-center flex-between w-full">
        <ul className="flex pl-32 font-medium gap-6 grow text-[#5C5F6A]">
          <li className="cursor-pointer">
            <a href={`${web_link}/`}>Home</a>
          </li>
          <li className="flex cursor-pointer">
            <a href={`${web_link}/products?page=1`}>Products</a>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/products");
              setBookFilter({ type: "SearchBookName", bookName: searchBook });
              setSearchBook("");
            }}
            className="flex border-2 px-2 py-1 rounded-md has-[:focus]:border-[#878A92]"
          >
            <img src="/magnifier.png" alt="search-icon" />
            <input
              type="text"
              placeholder="Search products"
              className="pl-2 outline-none "
              value={searchBook}
              onChange={(e) => {
                setSearchBook(e.target.value);
              }}
            />
          </form>
          <div
            onClick={async () => {
              const userId = Cookies.get("userId");
              if (userId) router.push("/cart");
              else router.push("/login");
            }}
            className="hover:bg-[#F6F6F6] w-10 h-10 flex justify-center items-center rounded-full"
          >
            <img src="/shopping cart.png" alt="shopping cart" />
          </div>
          <div
            onClick={async () => {
              const userId = Cookies.get("userId");
              if (userId) router.push("/profile");
              else router.push("/login");
            }}
            className="hover:bg-[#F6F6F6] w-10 h-10 flex justify-center items-center rounded-full"
          >
            <img src="/user.png" alt="user" />
          </div>
        </div>
      </div>
      <div className="lg:hidden" onClick={() => setShowNav((old) => !old)}>
        <img src="/burger-menu.png" alt="" width={"24px"} />
      </div>
      <div
        className={`absolute z-50 right-0 bg-white top-[84px] w-full lg:hidden xl:hidden ${
          !showNav && "hidden"
        }`}
      >
        <ul className="flex flex-col items-end pr-10 py-5 font-medium gap-6 grow text-[#5C5F6A]">
          <li className="cursor-pointer">
            <a href={`${web_link}/`} onClick={() => setShowNav(false)}>
              Home
            </a>
          </li>
          <li className="flex cursor-pointer" onClick={() => setShowNav(false)}>
            <a href={`${web_link}/products?page=1`}>Products</a>
          </li>
          <div className="flex flex-col items-end gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBookFilter({ type: "SearchBookName", bookName: searchBook });
                setSearchBook("");
              }}
              className="flex border-2 px-2 py-1 rounded-md has-[:focus]:border-[#878A92]"
            >
              <img src="/magnifier.png" alt="search-icon" />
              <input
                type="text"
                placeholder="Search products"
                className="pl-2 outline-none "
                onChange={(e) => {
                  setSearchBook(e.target.value);
                }}
              />
            </form>
            <div
              onClick={async () => {
                const userId = Cookies.get("userId");
                if (userId) router.push("/cart");
                else router.push("/login");
                setShowNav(false);
              }}
              className="hover:bg-[#F6F6F6] w-10 h-10 flex justify-center items-center rounded-full"
            >
              <img src="/shopping cart.png" alt="shopping cart" />
            </div>
            <div
              onClick={async () => {
                const userId = Cookies.get("userId");
                if (userId) router.push("/profile");
                else router.push("/login");
                setShowNav(false);
              }}
              className="hover:bg-[#F6F6F6] w-10 h-10 flex justify-center items-center rounded-full"
            >
              <img src="/user.png" alt="user" />
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
