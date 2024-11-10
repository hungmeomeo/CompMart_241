import React from "react";
import { web_link } from "@/config_var";
import { useRouter } from "next/navigation";

const Card = ({ productId, productName, isInStock, price, imgUrl }) => {
  const router = useRouter();

  // Calculate discounted price if product is out of stock
  const discountedPrice = isInStock ? price : price; // Apply 10% discount

  return (
    <div
      onClick={() => {
        router.push(`${web_link}/products/${productId}`);
      }}
      className="p-2 hover:bg-slate-100 hover:rounded-lg w-[200px] h-[280px] xl:w-[240px] xl:h-[336px] 2xl:w-[300px] 2xl:h-[420px] relative"
    >
      <div className="w-full h-3/4 bg-[#F6F6F6] rounded relative">
        <img src={imgUrl} alt="" className="h-full mx-auto" />
        {/* Discount Label */}
        {!isInStock && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-xl transform -rotate-12 animate-discount">
            -20%
          </div>
        )}
      </div>
      <h4 className="mt-2 w-full overflow-hidden whitespace-nowrap text-ellipsis">
        {productName}
      </h4>
      <div className="flex items-center gap-2 mt-2">
        <p
          className={`text-xs font-semibold border-2 rounded-full px-2 py-1 ${
            isInStock ? "border-gray-200" : "bg-black text-white border-black"
          }`}
        >
          {isInStock ? "Normal" : "Discount"}
        </p>
        <p className="flex items-center gap-2">
          {/* Display original price with strikethrough if discounted */}
          {!isInStock && (
            <span className="line-through text-gray-500">
              {price * 1.2} vnđ
            </span>
          )}
          <span>{discountedPrice} vnđ</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
