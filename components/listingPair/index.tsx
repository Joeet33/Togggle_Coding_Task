import { useEffect, useState } from "react";

export const ListingPair = () => {
  const [listingPair, setListingPair] = useState<any>();

  useEffect(() => {
    const fetchDeviceIds = async () => {
      const req = await fetch(
        "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
      );
      const res = await req.json();
      setListingPair(res);
    };
    setInterval(() => fetchDeviceIds(), 60000);
    fetchDeviceIds();
  }, []);

  console.log(listingPair);

  return <>
  <div>{listingPair && listingPair.price}</div>
  </>;
};
