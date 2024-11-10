import { Divider, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ReactStars from "react-stars";
import { Textarea } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { be_url } from "@/config_var";
import Cookies from "js-cookie";

const Review = ({ bookReviews, bookInfo, setReloadPage }) => {
  const toast = useToast()
  const [review, setReview] = useState({
    comment: "",
    rating: 0,
  });
  // console.log("Book: ", bookInfo)
  const postReview = async () => {
    try {
      const uid = Cookies.get("userId")
      const putReview = await axios.post(
        `${be_url}/review/${bookInfo._id}/${uid}`,
        {
          review: review.comment,
          rate: review.rating
        }
      );
      console.log(putReview);
    } catch (e) {
      console.log(e)
      toast({
        title: "You are not signed in",
        description: "You need to log in to leave a review",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <section className="my-10 md:my-20 flex flex-col md:flex-row md:h-96 gap-10 ">
      <div className="md:w-1/2">
        <h5 className="text-xl font-semibold">Reviews</h5>
        <Divider />
        <ul className="h-96 md:h-full overflow-y-scroll">
          {bookReviews &&
            bookReviews.map(ele => (
              <div
                key={uuid()}
                className="my-5 py-5 hover:bg-gray-100 hover:rounded-md px-4"
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-lg">{ele.user.username}</p>
                  <ReactStars size={24} edit={false} value={ele.rate} />
                </div>
                <p>{ele.review}</p>
              </div>
            ))}
        </ul>
      </div>
      <Divider orientation="vertical" />
      <div className="md:w-1/2">
        <h5 className="text-xl font-semibold">Write Reviews</h5>
        <Divider />
        <form
          action=""
          className="mt-6"
          onSubmit={async e => {
            e.preventDefault();
            await postReview();
            setReloadPage(old => (old + 1) % 2);
            setReview({ comment: "", rating: 0 });
          }}
        >
          <Textarea
            placeholder="What you want to share about this product"
            className="mb-4"
            value={review.comment}
            onChange={e => setReview({ ...review, comment: e.target.value })}
          />
          <ReactStars
            size={24}
            value={review.rating}
            onChange={newRate =>
              setReview({
                ...review,
                rating: newRate,
              })
            }
          />
          <button className="font-semibod text-white bg-black px-6 py-2 rounded-md mt-4">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Review;
