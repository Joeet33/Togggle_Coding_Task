import { useEffect, useState } from "react";
import { ListingProps } from "../interfaces/listingProps";
import { LatestPrice } from "../latestPrice";
import { Timer } from "../timer";

export const ListingPair = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [price, setPrice] = useState<ListingProps>();
  const [newPriceUp, setNewPriceUp] = useState<ListingProps>();
  const [newPriceDown, setNewPriceDown] = useState<ListingProps>();
  const [score, setScore] = useState(0);

  const fetchPrice = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setPrice(res);
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
    if (newPriceUp && newPriceUp && price && price) {
      if (newPriceUp.price > price.price) {
        setScore(score + 1);
      }

      if (newPriceUp.price < price.price) {
        setScore(score - 1);
      }
    }
  }, [newPriceUp]);

  useEffect(() => {
    if (newPriceDown && newPriceDown && price && price) {
      if (newPriceDown.price > price.price) {
        setScore(score - 1);
      }

      if (newPriceDown.price < price.price) {
        setScore(score + 1);
      }
    }
  }, [newPriceDown]);

  console.log(score);
  console.log(price);
  console.log(newPriceUp);
  console.log(newPriceDown);

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
        disabled={isDisabled}
        onClick={handleOnClickDown}
        className="bg-gray-500"
      >
        Down
      </button>
    </>
  );
};
