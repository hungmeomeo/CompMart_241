import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Progress,
  Box,
  Text,
} from "@chakra-ui/react";
import { FaMotorcycle } from "react-icons/fa";
import OrderProduct from "./OrderProduct";

const OrderItem = ({ order }) => {
  const [progress, setProgress] = useState(0); // Initial progress state

  useEffect(() => {
    if (!order.onDelivery) {
      setProgress(100); // If order is already delivered, set progress to 100%
      return;
    }

    const calculateProgress = () => {
      const orderTime = moment(order.orderdate);
      const currentTime = moment();
      const diffInSeconds = currentTime.diff(orderTime, "seconds");
      const percentage = Math.min(diffInSeconds / 1000 + 1, 100); // Cap at 100%
      setProgress(percentage);
    };

    // Initial calculation
    calculateProgress();

    // Update progress every second
    const interval = setInterval(calculateProgress, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [order.onDelivery, order.orderdate]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <div className="flex pr-4">
            <div className="w-80 cursor-default">
              <p className="text-left">{order._id.slice(2, 10)}</p>
            </div>
            <div className="w-40 cursor-default">
              <p>{moment(order.orderdate).format("HH:mm MM/DD/YYYY")}</p>
            </div>
            <div className="w-40 flex justify-end cursor-default">
              <p
                style={{ color: progress < 100 ? "#D69E2E" : "#38A169" }} // Yellow for "On Delivery", Green for "Finish"
              >
                {progress < 100 ? "On Delivery" : "Successful Deliver"}
              </p>
            </div>
          </div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {/* Progress Bar with Motorbike Icon */}
        <div className="relative py-2">
          <Progress
            value={progress}
            colorScheme={progress < 100 ? "yellow" : "green"}
            size="sm"
            borderRadius="md"
            style={{ marginTop: "40px" }}
          />
          {/* Motorbike Icon positioned above the progress bar */}
          <div
            style={{
              position: "absolute",
              left: `calc(${progress}% - 15px)`, // Adjust for half the icon width for centering
              top: "10px",
              transition: "left 0.1s ease",
            }}
          >
            <FaMotorcycle size={30} color={"black"} />
          </div>
          <Box
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            zIndex="1"
          >
            <Text fontWeight="bold" color="white">
              {Math.round(progress)}%
            </Text>
          </Box>
        </div>

        <div className="flex flex-col gap-2">
          {order.cart1.map((book) => (
            <OrderProduct key={book.id} product={book} />
          ))}
          <Divider />
          <div className="flex flex-col items-end">
            <div className="flex justify-between font-semibold w-full">
              <p>Total Price:</p>
              <p>{order.totalPrice}</p>
            </div>
            <p className="text-xs text-gray-400">
              Including shipping fee and tax
            </p>
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default OrderItem;
