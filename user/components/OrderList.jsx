import React, { useEffect, useState, useMemo } from "react";
import OrderContent from "./order/OrderContent";
import OrderItem from "./order/OrderItem";
import axios from "axios";
import { be_url } from "@/config_var";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";

const CustomerOrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const userOrderList = await axios.get(
          `${be_url}/user/${Cookies.get("userId")}/checkOrder`
        );
        setOrderList(userOrderList.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  const completedOrders = useMemo(
    () => orderList.filter((order) => order.status === "completed").length,
    [orderList]
  );

  const totalOrders = orderList.length;
  const progress = totalOrders ? (completedOrders / totalOrders) * 100 : 0;

  // Reverse orderList for display purposes
  const reversedOrderList = useMemo(
    () => [...orderList].reverse(),
    [orderList]
  );

  return (
    <div className="mt-7 py-4 md:mt-0 md:pl-10 flex flex-col">
      <p className="font-semibold text-lg">Your Order</p>
      <OrderContent>
        {reversedOrderList.map((order) => (
          <OrderItem key={uuid()} order={order} />
        ))}
      </OrderContent>

      {/* Progress bar below the order list */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2 my-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {Math.round(progress)}% of Orders Completed
      </p>
    </div>
  );
};

export default CustomerOrderList;
