"use client";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { Tag } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Review from "@/components/Review";
import axios from "axios";
import { be_url } from "@/config_var";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";

const page = ({ params }) => {
  const [qty, setQty] = useState(1);
  const [book, setBook] = useState();
  const [randBook, setRandBook] = useState();
  const productId = params.productID;
  // const cartProduct = {
  //   imgUrl: product?.imgUrl,
  //   id: product?.productId,
  //   name: product?.productName,
  //   price: product?.productPrice,
  //   quantity: qty,
  // };
  const [cartProduct, setCartProduct] = useState();
  const [reviewList, setReviewList] = useState();
  const [reloadPage, setReloadPage] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fullFetch = async () => {
      try {
        const response = await axios.get(`${be_url}/${productId}`);
        setBook(response.data);
        const response2 = await axios.get(`${be_url}/home`);
        setRandBook(response2.data);
        const response3 = await axios.get(
          `${be_url}/review/${response.data._id}`
        );
        setReviewList(response3.data.reviews);
      } catch (e) {
        console.log(e);
      }
    };

    fullFetch();
  }, [reloadPage]);
  return (
    <>
      <main className="responsive-layout mt-6">
        <p className="text-gray-600 font-medium">
          Ecommerce &gt; <span className="text-black">{book && book.name}</span>
        </p>
        <section className="flex flex-col md:flex-row gap-10 xl:gap-30 lg:gap-20 mt-10">
          <div className="xl:w-2/5 lg:w-2/5 md:w-1/2">
            <img src={book && book.image} alt="" className="w-full" />
          </div>
          <div className="w-full">
            <h1 className="font-bold text-4xl">{book && book.name}</h1>
            <Tag
              borderRadius={100}
              variant="outline"
              color="black"
              size="md"
              mt={2}
            >
              {book && book.status === true ? "HOT" : ""}
            </Tag>
            <div className="mt-6">
              <p className="font-semibold text-xl text-gray-600">Category</p>
              <div className="flex gap-4">
                {book &&
                  book.genre.map((ele) => (
                    <Tag
                      borderRadius={100}
                      variant="outline"
                      color="black"
                      size="md"
                      mt={2}
                    >
                      {ele}
                    </Tag>
                  ))}
              </div>
            </div>
            <p className="font-semibold text-xl mt-10">
              {book && book.price} vnd
            </p>
            <p className="text-gray-600 font-semibold mt-10">QUANTITY</p>
            <div className="flex border-2 w-fit items-center rounded-md mt-2">
              <button
                onClick={() => {
                  setQty((old) => (old - 1 >= 1 ? old - 1 : old));
                }}
                className="px-4 py-2 rounded-s-sm active:bg-gray-300"
              >
                -
              </button>
              <input
                className="outline-none w-6"
                name="qty"
                type="number"
                value={qty}
                onChange={(e) => {
                  setQty(Number(e.target.value));
                }}
              />
              <button
                onClick={() => {
                  setQty((old) => old + 1);
                }}
                className="px-4 py-2 rounded-e-sm active:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={async () => {
                if (book && book.status == "InStock") {
                  try {
                    const userId = Cookies.get("userId");
                    const addProductToCart = await axios.post(
                      `${be_url}/user/${userId}/${book._id}`,
                      { quantity: qty }
                    );
                    console.log(addProductToCart.data);
                    toast({
                      title: "Product add to cart",
                      description: "The book you want has been added to cart",
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                    });
                  } catch (e) {
                    toast({
                      title: "Cannot add to cart",
                      description: "You need to sign in to take this action",
                      status: "error",
                      duration: 1000,
                      isClosable: true,
                    });
                  }
                }
              }}
              className={`text-white bg-black px-24 py-3 rounded-lg mt-20 ${
                book && book.status == true && "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Add to cart
            </button>
          </div>
        </section>
        <Review
          bookReviews={reviewList}
          bookInfo={book}
          setReloadPage={setReloadPage}
        />
        <section className="my-20">
          <h2 className="font-semibold text-2xl">You might also like</h2>
          <p className="text-gray-600">SIMILAR PRODUCT</p>
          <div className="responsive-card-display">
            {randBook &&
              [1, 4, 6, 3].map((idx) => (
                <Card
                  key={uuid()}
                  productId={randBook[idx].id}
                  productName={randBook[idx].name}
                  price={randBook[idx].price}
                  isInStock={randBook[idx].status === "InStock" ? true : false}
                  imgUrl={randBook[idx].image}
                />
              ))}
          </div>
        </section>
      </main>
      <Footer bgColor={"#F6F6F6"} />
    </>
  );
};

export default page;
