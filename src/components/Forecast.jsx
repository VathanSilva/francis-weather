import React, {useState} from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  console.log(items);
  const [noOfElement, setnoOfElement] = useState(3);
  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  }
  const slice = items.slice(0, noOfElement);
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">

        {slice.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}

        <button
          className="btn btn-dark d-black w-100"
          onClick={() => loadMore()}
        >
          View More
        </button>
        
      </div>
    </div>
  );
}

export default Forecast;
