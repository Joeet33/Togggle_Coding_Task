import { useEffect, useState } from "react";
import { ListingProps } from "../interfaces/listingProps";
import { LatestPrice } from "../latestPrice";
import { Timer } from "../timer";

export const MarketPriceGuess = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [oldPrice, setOldPrice] = useState<ListingProps>();
  const [newPriceUp, setNewPriceUp] = useState<ListingProps>();
  const [newPriceDown, setNewPriceDown] = useState<ListingProps>();
  const [score, setScore] = useState(0);

  const fetchPrice = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setOldPrice(res);
  };

  const fetchNewPriceUp = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setNewPriceUp(res);
  };

  const fetchNewPriceDown = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setNewPriceDown(res);
  };

  const handleOnClickUp = () => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 60000);
    setNewPriceUp(undefined);
    setNewPriceDown(undefined);
    fetchPrice();
    setTimeout(() => fetchNewPriceUp(), 60000);
  };

  const handleOnClickDown = () => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 60000);
    setNewPriceUp(undefined);
    setNewPriceDown(undefined);
    fetchPrice();
    setTimeout(() => fetchNewPriceDown(), 60000);
  };

  useEffect(() => {
    if (newPriceUp && newPriceUp && oldPrice && oldPrice) {
      if (newPriceUp.price > oldPrice.price) {
        setScore(score + 1);
      }

      if (newPriceUp.price < oldPrice.price) {
        setScore(score - 1);
      }
    }
  }, [newPriceUp]);

  useEffect(() => {
    if (newPriceDown && newPriceDown && oldPrice && oldPrice) {
      if (newPriceDown.price > oldPrice.price) {
        setScore(score - 1);
      }

      if (newPriceDown.price < oldPrice.price) {
        setScore(score + 1);
      }
    }
  }, [newPriceDown]);

  console.log(score);
  console.log(oldPrice);
  console.log(newPriceUp);
  console.log(newPriceDown);

  return (
    <>
      <Timer activate={isDisabled} />
      <LatestPrice />
      <div>{score}</div>
      <button
        disabled={isDisabled}
        onClick={handleOnClickUp}
        className="bg-gray-500"
      >
        Up
      </button>
      <button
        disabled={isDisabled}
        onClick={handleOnClickDown}
        className="bg-gray-500"
      >
        Down
      </button>
    </>
  );
};
