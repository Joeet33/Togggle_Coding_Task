import { useEffect, useState } from "react";
import { ListingProps } from "../interfaces/listingProps";

export const LatestPrice = () => {
  const [latestPrice, setLatestPrice] = useState<ListingProps>();

  const fetchLatestPrice = async () => {
    const req = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const res = await req.json();
    setLatestPrice(res);
  };

  useEffect(() => {
    fetchLatestPrice();
    setInterval(() => fetchLatestPrice(), 1000);
  }, []);

  return <>{latestPrice && latestPrice.price}</>;
};
