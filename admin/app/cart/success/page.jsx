import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { web_link } from "@/config_var";
import React from "react";

const page = () => {
  return (
    <>
      <Navigation
        bgColor={"#D5E5D7"}
        path={["Ecommerce", "Successful Order"]}
      />
      <div className="flex flex-col items-center mx-auto my-25 gap-10">
        <img src="/Package.png" alt="" />
        <h1 className="font-bold text-3xl">Thank you for shopping</h1>
        <p className="text-ceter text-[#5C5F6A]">
          Your order has been successfully placed and is now being processed.
        </p>
        <a
          href={`${web_link}/products`}
          className="group bg-black text-white flex px-6 py-2 rounded-md w-fit"
        >
          Continue Shopping{" "}
          <img
            src="/Arrow Right.png"
            alt="arrow"
            className="relative group-hover:translate-x-2 group-hover:transition-transform transition-transform"
          />
        </a>
      </div>
      <Footer bgColor={"#F6F6F6"} />
    </>
  );
};

export default page;
