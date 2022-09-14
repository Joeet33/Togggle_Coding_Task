import { useEffect, useState } from "react";

export const ListingPair = () => {
  const [listingPair, setListingPair] = useState<any>();

  const fetchListingPair = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setListingPair(res);
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  const handleClick = () => {
    fetchListingPair();
    setIsDisabled(true);
  };

  useEffect(() => {
    if (isDisabled == true) {
      setTimeout(() => setIsDisabled(false), 60000);
    }
  }, [isDisabled]);

  if (counter == 0) setCounter(60);

  if (isDisabled == true) setTimeout(() => setCounter(counter - 1), 1000);

  useEffect(() => {
    fetchListingPair();
    setInterval(() => fetchListingPair(), 60000);
  }, []);

  console.log(isDisabled);

  return (
    <>
      <div>{listingPair && listingPair.price}</div>
      <div>{counter == 60 ? null : counter}</div>
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
