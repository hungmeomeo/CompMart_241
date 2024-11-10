"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React, { useState } from "react";
import { Divider, Stack } from "@chakra-ui/react";
import SummaryProduct from "@/components/SummaryProduct";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { be_url, web_link } from "@/config_var";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Cookies from "js-cookie";

const Cart = () => {
  // cart or ship
  const router = useRouter();
  const [orderState, setOrderState] = useState("cart");
  const [cartList, setCartList] = useState([]);
  const [updateCart, setUpdateCart] = useState(1);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [payingMethod, setPayingMethod] = useState(); // cod or vnpay
  const [paymentMethod, setPaymentMethod] = useState("VNBANK");
  let totalPrice = 0;
  for (let product of cartList) {
    totalPrice += product.product.price * product.quantity;
  }
  let shippingFee = totalPrice > 500000 ? 0 : 15000;
  let tax = Math.round(totalPrice * 0.07);

  const generateRandomString = (length) => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const randomString = generateRandomString(10);

  const addInfo = `${totalPrice + shippingFee + tax}${"  "}${randomString}`;
  useEffect(() => {
    const getCartList = async () => {
      try {
        const uid = Cookies.get("userId");
        const getCart = await axios.get(`${be_url}/user/${uid}`);
        setCartList(getCart.data.cart);
      } catch (e) {
        console.log(e);
      }
    };
    getCartList();

    const getCustomerInfo = async () => {
      try {
        const uid = Cookies.get("userId");
        const fetchCustomerInfo = await axios.get(
          `${be_url}/user/${uid}/shipping`
        );
        console.log(fetchCustomerInfo.data);
        fetchCustomerInfo.data.length &&
          setCustomerInfo(fetchCustomerInfo.data[0]);
      } catch (e) {
        console.log(e);
      }
    };

    getCustomerInfo();
  }, [updateCart]);

  console.log(payingMethod);

  return (
    <>
      <Navigation path={["Ecommerce", "Cart"]} bgColor={"#F6F6F6"} />
      <main className="responsive-layout mt-24 gap-10 flex flex-col lg:flex-row justify-between mb-40 w-full">
        {orderState == "cart" ? (
          <section className="lg:w-3/5">
            <h3 className="font-semibold text-lg">Your cart</h3>
            <Divider />
            <ul className="flex flex-col gap-4 mt-4 h-96 overflow-y-scroll w-full">
              {cartList &&
                cartList.map((product) => {
                  return (
                    <SummaryProduct
                      key={product.product._id}
                      productInfo={product}
                      updateCart={setUpdateCart}
                    />
                  );
                })}
            </ul>
          </section>
        ) : (
          <section>
            <div>
              <div className="flex flex-col md:flex-row justify-between">
                <h3 className="font-semibold text-lg">Shipping Address</h3>
                <p className="text-gray-500">
                  Can't see all information, update{" "}
                  <a
                    href={`${web_link}/profile`}
                    className="text-black hover:underline"
                  >
                    here
                  </a>
                </p>
              </div>
              <form action="" className="w-full mt-6">
                <FormControl>
                  <FormLabel>Street Address</FormLabel>
                  <Input
                    value={customerInfo && customerInfo.address}
                    disabled
                  />
                </FormControl>
                <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
                  <FormControl className="w-[300px]">
                    <FormLabel>City</FormLabel>
                    <Input
                      value={customerInfo && customerInfo.city}
                      placeholder=""
                      disabled
                    />
                  </FormControl>
                  <FormControl className="w-[300px]">
                    <FormLabel>District</FormLabel>
                    <Input
                      value={customerInfo && customerInfo.district}
                      disabled
                    />
                  </FormControl>
                  <FormControl className="w-[300px]">
                    <FormLabel>Ward</FormLabel>
                    <Input value={customerInfo && customerInfo.ward} disabled />
                  </FormControl>
                </div>
                <FormControl className="mt-6">
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    value={customerInfo && customerInfo.ship_phone}
                    disabled
                  />
                </FormControl>
              </form>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-lg">Paying Method</h3>
              <RadioGroup
                defaultValue="option-one"
                className="mt-2"
                onValueChange={(val) => {
                  setPayingMethod(val);
                }}
              >
                <div
                  className={`flex items-center space-x-2 border-2 p-2 rounded-md ${
                    payingMethod == "cod" && "bg-gray-200"
                  }`}
                >
                  <RadioGroupItem value="cod" id="option-one" />
                  <div className="flex items-center gap-2">
                    <img src="/cash.png" className="w-6 h-6" />
                    <label htmlFor="option-one" className="font-medium">
                      Pay In Cash
                    </label>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-2 border-2 p-2 rounded-md ${
                    payingMethod == "vnpay" && "bg-gray-200"
                  }`}
                >
                  <RadioGroupItem value="vnpay" id="option-two" />
                  <div className="flex items-center gap-2">
                    <img
                      src="data:image/png;base64,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"
                      className="w-6 h-6"
                    />
                    <label htmlFor="option-two" className="font-medium">
                      Pay Through VietQR
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </section>
        )}
        <section className="border-2 p-4 h-fit mt-4 lg:mt-0 rounded-lg xl:w-[400px] lg:w-[360px]">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          <div className="flex justify-between mt-8">
            <p className="text-[#5C5F6A] font-medium">Subtotal:</p>
            <p className="font-semibold">{totalPrice} đ</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-[#5C5F6A] font-medium">Shipping:</p>
            <p className="font-semibold">{shippingFee} đ</p>
          </div>
          <div className="flex justify-between my-4">
            <p className="text-[#5C5F6A] font-medium">Tax:</p>
            <p className="font-semibold">{tax} đ</p>
          </div>
          <Divider />
          <div className="flex justify-between my-4">
            <p className="text-[#5C5F6A] font-medium">Total</p>
            <p className="font-semibold">{totalPrice + shippingFee + tax} đ</p>
          </div>
          <button
            onClick={async () => {
              if (orderState === "cart") {
                setOrderState("ship");
              } else if (orderState === "ship" && payingMethod === "vnpay") {
                try {
                  const paymentUrl = await axios.post(
                    `${be_url}/payment/create_payment_url`,
                    {
                      amount: totalPrice + shippingFee + tax,
                      bankCode: paymentMethod,
                    }
                  );

                  const setOrder = await axios.get(
                    `${be_url}/user/${Cookies.get("userId")}/${
                      totalPrice + shippingFee + tax
                    }/setOrder`
                  );

                  console.log(setOrder.data);
                  router.replace(paymentUrl.data);
                } catch (e) {
                  console.log(e);
                }
              } else {
                try {
                  const setOrder = await axios.get(
                    `${be_url}/user/${Cookies.get("userId")}/${
                      totalPrice + shippingFee + tax
                    }/setOrder`
                  );

                  console.log(setOrder.data);
                } catch (e) {
                  console.log(e);
                }
                router.push("/cart/success");
              }
            }}
            className={`w-full text-white bg-black py-3 rounded-md font-medium  ${
              payingMethod == "vnpay" && "hidden"
            }`}
          >
            {orderState == "cart" ? "Checkout" : "Place Order"}
          </button>

          <a
            onClick={() => {
              if (orderState == "ship") {
                setOrderState("cart");
              } else {
                router.push("/products");
              }
            }}
            className="mt-4 block hover:underline font-medium text-center my-auto cursor-pointer"
          >
            {orderState == "cart" ? "Continue Shopping" : "Edit Cart"}
          </a>

          <div
            className={`mt-4 flex flex-col items-center ${
              payingMethod !== "vnpay" && "hidden"
            }`}
          >
            <label htmlFor="" className="text-lg font-semibold">
              Scan the QR code to pay
            </label>
            <img
              src={`https://img.vietqr.io/image/ocb-0004100037548005-compact2.jpg?amount=${
                totalPrice + shippingFee + tax
              }&addInfo=${addInfo}&accountName=Hoang%20Hung`}
              className="w-100 h-100 mt-100"
              style={{ marginLeft: "10px" }}
            />
          </div>
        </section>
      </main>
      <Footer bgColor="#F6F6F6" />
    </>
  );
};

export default Cart;
