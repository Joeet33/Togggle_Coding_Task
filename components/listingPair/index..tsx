import { useEffect, useState } from "react";
import { LatestPrice } from "../latestPrice";
import { Timer } from "../timer";

export const ListingPair = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [price, setPrice] = useState<any>();
  const [newPrice, setNewPrice] = useState<any>();
  const [score, setScore] = useState(0);

  const fetchPrice = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setPrice(res);
  };

  const fetchNewPrice = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setNewPrice(res);
  };

  const handleOnClickUp = () => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 5000);
    setNewPrice(undefined);
    fetchPrice();
    setTimeout(() => fetchNewPrice(), 5000);
  };

  useEffect(() => {
    if (newPrice && newPrice.price > price.price) {
      setScore(score + 1);
    }
    if (newPrice && newPrice.price < price.price) {
      setScore(score - 1);
    }
  }, [newPrice]);

  console.log(score);
  console.log(price);
  console.log(newPrice);

  return (
    <>
      <Timer activate={isDisabled} />
      <LatestPrice />
      <button
        disabled={isDisabled}
        onClick={handleOnClickUp}
        className="bg-gray-500"
      >
        Up
      </button>
      <button
        // disabled={isDisabled}
        // onClick={handleClickDown}
        className="bg-gray-500"
      >
        Down
      </button>
    </>
  );
};
