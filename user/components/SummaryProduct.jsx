"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { be_url } from "@/config_var";
import Cookies from "js-cookie";

const SummaryProduct = ({ productInfo, updateCart}) => {
  const [qty, setQty] = useState(productInfo.quantity);
  useEffect(() => {
    const updateCartProduct = async () => {
      try {
        const userId = Cookies.get("userId")
        const updateProductInCart = await axios.put(
          `${be_url}/user/${userId}/${productInfo.product._id}/update`,
          { quantity: qty }
        );
        updateCart(old => (old + 1) % 2)
      } catch (e) {
        console.log(e);
      }
    }
    updateCartProduct()
  },[qty])
  console.log(productInfo)
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-md bg-[#F6F6F6] flex justify-center">
          <img src={productInfo.product.image} alt="" className="object-fit" />
        </div>
        <p className="font-semibold text-lg ml-5 w-[180px] truncate text-ellipsis">
          {productInfo.product.name}
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-semibold ml-20">
          {productInfo.product.price * productInfo.quantity}
        </p>
        <Input
          variant="flushed"
          type="number"
          value={qty}
          onInput={async e => {
            setQty(Number(e.target.value));
          }}
          onClick={e => {
            e.target.select();
          }}
          width={"48px"}
          ml={"12px"}
        />
        <button
          onClick={async e => {
            try {
              const uid = Cookies.get("userId")
              const deleteProductInCart = await axios.delete(`${be_url}/user/${uid}/${productInfo.product._id}`)
              // console.log("You delete this product ", productInfo.product)
              updateCart(old => (old + 1) % 2)
            }
            catch (e) {
              console.log(e)
            }
          }}
          className="ml-6 bg-[#F6F6F6] rounded-md w-10 h-10 flex items-center justify-center active:bg-gray-300 active:rounded-md"
        >
          <img src="/close-icon.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default SummaryProduct;
