import React, { useState } from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FilterDispatch } from "@/context/Context";

const RangeSliderUI = () => {
  const [val, setVal] = useState([0, 200000]);
  const dispatch = useContext(FilterDispatch);
  return (
    <>
      <RangeSlider
        onChange={(newVal) => {
          setVal(newVal);
          dispatch({ type: "FilterPrice", priceRange: newVal });
        }}
        aria-label={["min", "max"]}
        defaultValue={[0, 2000000]}
        min={0}
        max={2000000}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} className="z-0" />
        <RangeSliderThumb index={1} className="z-0" />
      </RangeSlider>
      <div className="flex justify-between">
        <p>{val[0]} đ</p>
        <p>{val[1]} đ</p>
      </div>
    </>
  );
};

export default RangeSliderUI;
