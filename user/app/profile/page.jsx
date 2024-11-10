"use client";

import Detail from "@/components/Detail";
import Navigation from "@/components/Navigation";
import SetPassword from "@/components/OrderList";
import ShippingAddress from "@/components/ShippingAddress";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import CustomerOrderList from "@/components/OrderList";

const Profile = () => {
  const [navItem, setNavItem] = useState("Order"); // Addr | Order | Detail
  let display;
  switch (navItem) {
    case "Addr":
      display = <ShippingAddress />;
      break;
    case "Order":
      display = <CustomerOrderList />;
      break;
    // case "Detail":
    //   display = <Detail />;
    //   break;
  }
  return (
    <>
      <Navigation path={["Ecommerce", "My Account"]} />
      <Sidebar navItem={navItem} setNavItem={setNavItem} className={"w"} style={{ width: "400px", height:"300px" }}>
        {display}
      </Sidebar>
      <Footer bgColor={"#F6F6F6"}/>
    </>
  );
};

export default Profile;
