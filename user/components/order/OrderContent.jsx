import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const OrderContent = ({children}) => {
  return (
    <Accordion
      className="h-full overflow-y-scroll flex flex-col gap-2"
      allowMultiple
    >
      {children}
    </Accordion>
  );
}

export default OrderContent