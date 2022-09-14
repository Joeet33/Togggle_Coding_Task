import { useEffect, useState } from "react";

export const ListingPair = () => {
  const [listingPair, setListingPair] = useState<any>();
  const [oldPrice, setOldPrice] = useState();
  const [newPrice, setNewPrice] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  const fetchListingPair = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setListingPair(res);
  };

  const handleClick = () => {
    setOldPrice(listingPair.price);
    setIsDisabled(true);
    setNewPrice(undefined);
  };

  useEffect(() => {
    fetchListingPair();
    setInterval(() => fetchListingPair(), 1000);
  }, []);

  useEffect(() => {
    if (isDisabled == true) {
      setTimeout(() => setIsDisabled(false), 60000);
    }
  }, [isDisabled]);

  if (counter == 0) {
    setCounter(60);
    setNewPrice(listingPair.price);
  }

  if (isDisabled == true) setTimeout(() => setCounter(counter - 1), 1000);

  return (
    <>
      <div>{listingPair && listingPair.price}</div>
      <div>{counter == 60 ? null : counter}</div>
      <div>{oldPrice && oldPrice}</div>
      <div>{newPrice && newPrice}</div>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        className="bg-gray-500"
      >
        click
      </button>
    </>
  );
};
