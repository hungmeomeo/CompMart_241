"use client";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { web_link, be_url } from "@/config_var";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const HomePage = () => {
  const [bookStatus, setBookStatus] = useState("Latest"); // Featured | Latest
  const [bookList, setBookList] = useState();
  const [mail, setMail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${be_url}/home`);
        setBookList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="responsive-layout bg-[url('https://file.hstatic.net/200000722513/file/t10_thu_cu_doi_moi_web_slider_800x400.png')] py-10 bg-cover md:bg-none md:bg-[#F6F6F6] flex md:justify-between md:items-center md:py-20">
        <div className="brightness-110 text-center">
          <h1 className="text-4xl font-extrabold text-black drop-shadow-md animate-pulse">
            Hot Arrivals Today!
          </h1>
          <p className="mt-5 font-semibold text-black">
            Discover Our Latest and Hottest Collection Now!
          </p>
          <a
            href={`${web_link}/products`}
            className="group bg-black text-white flex px-8 py-3 rounded-full mt-16 w-fit mx-auto hover:bg-[#333333] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Shop Now{" "}
            <img
              src="/Arrow Right.png"
              alt="arrow"
              className="ml-2 relative group-hover:translate-x-2 transition-transform"
            />
          </a>
        </div>
        <img
          src="https://file.hstatic.net/200000722513/file/t10_thu_cu_doi_moi_web_slider_800x400.png"
          alt="books-image"
          className="w-1/2 hidden md:inline-block"
        />
      </section>
      <section className="responsive-layout flex flex-col items-center py-10 md:py-15 md:flex md:flex-row xl:p-20 md:justify-between gap-10">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="rounded-full bg-[#F6F6F6] w-12 h-12 flex justify-center items-center">
            <img src="/shipping.png" alt="" className="w-6" />
          </div>
          <h2 className="font-bold mt-8 mb-4">Free Shipping</h2>
          <p className="text-[#5C5F6A] text-center">
            Upgrade your style today and get FREE shipping on all orders! Don't
            miss out.
          </p>
        </div>
        <div className="flex flex-col items-center md:w-1/3">
          <div className="rounded-full bg-[#F6F6F6] w-12 h-12 flex justify-center items-center">
            <img src="/medal.png" alt="" className="w-6" />
          </div>
          <h2 className="font-bold mt-8 mb-4">Satisfaction Guarantee</h2>
          <p className="text-[#5C5F6A] text-center">
            Shop confidently with our Satisfaction Guarantee: Love it or get a
            refund.
          </p>
        </div>
        <div className="flex flex-col items-center md:w-1/3">
          <div className="rounded-full bg-[#F6F6F6] w-12 h-12 flex justify-center items-center">
            <img src="/secure.png" alt="" className="w-6" />
          </div>
          <h2 className="font-bold mt-8 mb-4">Secure Payment</h2>
          <p className="text-[#5C5F6A] text-center">
            Your security is our priority. Your payments are secure with us.
          </p>
        </div>
      </section>
      <section className="responsive-layout flex flex-col items-center">
        <h3 className="text-[#5C5F6A] font-medium">SHOP NOW</h3>
        <h2 className="font-semibold text-xl">Best Selling</h2>
        <div className="responsive-card-display">
          {bookList && (
            <>
              <Card
                productId={bookList[0]._id}
                productName={bookList[0].name}
                isInStock={bookList[0].status === "InStock" ? true : false}
                price={bookList[0].price}
                imgUrl={bookList[0].image}
              />
              <Card
                productId={bookList[1]._id}
                productName={bookList[1].name}
                isInStock={bookList[1].status === "InStock" ? true : false}
                price={bookList[1].price}
                imgUrl={bookList[1].image}
              />
              <Card
                productId={bookList[2]._id}
                productName={bookList[2].name}
                isInStock={bookList[2].status === "InStock" ? true : false}
                price={bookList[2].price}
                imgUrl={bookList[2].image}
              />
              <Card
                productId={bookList[3]._id}
                productName={bookList[3].name}
                isInStock={bookList[3].status === "InStock" ? true : false}
                price={bookList[3].price}
                imgUrl={bookList[3].image}
              />
            </>
          )}
        </div>
      </section>
      <section className="responsive-layout flex justify-center items-center">
        <div className="my-16 text-center">
          <h2 className="font-bold text-2xl">Browse Our Computer Paradise</h2>
          <p className="text-[#5C5F6A] mt-2 mb-7">
            Step into a world of fantasy and explore our diverse computer world
          </p>
          <a
            href={`${web_link}/products`}
            className="bg-black text-white flex px-6 py-2 rounded-md w-fit group cursor-pointer mx-auto"
          >
            Start Browsing{" "}
            <img
              src="/Arrow Right.png"
              alt="arrow"
              className="relative group-hover:translate-x-2 group-hover:transition-transform transition-transform"
            />
          </a>
        </div>
      </section>

      <section className="responsive-layout py-12 bg-[#FFE5CC] flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-bold text-2xl">Join Our Newsletter</h2>
          <p className="text-[#5C5F6A] mt-4">
            We love to surprise our subscribers with occasional gifts
          </p>
        </div>
        <form
          method="POST"
          className="flex w-1/3 h-12 gap-2 mt-4"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const noti = await axios.post(`${web_link}/api/send-email`, {
                to: mail,
                subject: "JPBook",
                text: "Thank you for subscribing to our shop You will be notified about our news (new arrivals, sales, etc..) every one months. You can unsubscribe anytime by clicking the subscribe button again. We hope you get the best experience when shopping at our store. We are looking forward to serving you",
              });
              setMail("");
              console.log(noti.data);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <input
            type="text"
            value={mail}
            placeholder="Your email address"
            onChange={(e) => {
              setMail(e.target.value);
            }}
            className="grow pl-2 outline-none bg-[#F6F6F6] border-2 px-2 py-0.5 lg:py-1 rounded-md focus:border-[#878A92]"
          />
          <button className="bg-black text-white px-4 rounded">
            Subscribe
          </button>
        </form>
      </section>
      <Footer bgColor="white" />
    </>
  );
};

export default HomePage;
