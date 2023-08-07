import React, { MouseEventHandler, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BsStarFill } from "react-icons/bs";
// import "./App.css";
import { classNames } from "@/utility/misc/classNames";

interface P {
  rating: number;
  maxRating: number;
  recordRating: (rating: number, ratingMax: number) => void;
}

export const RadioGroupStars = (props: P) => {
  const ratings = [1, 2, 3, 4, 5];
  const { recordRating, rating, maxRating } = props;
  const [value, setValue] = useState<number>(rating);

  return (
    <>
      <RadioGroup value={value} onChange={setValue} className="w-full my-1">
        <RadioGroup.Label className="sr-only">Choose a rating</RadioGroup.Label>
        <div className="flex flex-row-reverse justify-center gap-1">
          {[...ratings].reverse().map((item) => (
            <RadioGroup.Option
              key={item}
              value={item}
              onClick={() => {
                console.log("---");
                recordRating(item, 5);
              }}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer text-gray-200 py-0.5",
                  "flex-1 hover:text-orange-400",
                  "peer",
                  "peer-hover:text-orange-400",
                  active ? "text-orange-500" : "",
                  checked ? "text-orange-500" : "",
                  // 👇 Add a compare with selected value here
                  value >= item ? "text-orange-500" : ""
                )
              }
            >
              <RadioGroup.Label as={BsStarFill} className="w-6 h-6 m-auto" />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
};
