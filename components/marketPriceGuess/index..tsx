import { useEffect, useState } from "react";
import { ListingProps } from "../interfaces/listingProps";
import { LatestPrice } from "../latestPrice";
import { Timer } from "../timer";
import { API } from "aws-amplify";
import { updateScore as updateScoreMutation } from "../../src/graphql/mutations.js";
import { listScores } from "../../src/graphql/queries.js";
import { ScoresProps } from "../interfaces/scoresProps";

export const MarketPriceGuess = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [oldPrice, setOldPrice] = useState<ListingProps>();
  const [newPriceUp, setNewPriceUp] = useState<ListingProps>();
  const [newPriceDown, setNewPriceDown] = useState<ListingProps>();
  const [scoresData, setScoresData] = useState<ScoresProps[]>();

  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    const apiData: any = await API.graphql({ query: listScores });
    setScoresData(apiData.data.listScores.items);
  }

  async function updateScoreWinning() {
    await API.graphql({
      query: updateScoreMutation,
      variables: {
        input: {
          id: scoresData && scoresData[0]?.id,
          score: scoresData && scoresData[0].score + 1,
          _version: scoresData && scoresData[0]._version,
        },
      },
    });
    fetchScores();
  }

  const updateScoreLosing = async () => {
    await API.graphql({
      query: updateScoreMutation,
      variables: {
        input: {
          id: scoresData && scoresData[0]?.id,
          score: scoresData && scoresData[0].score - 1,
          _version: scoresData && scoresData[0]._version,
        },
      },
    });
    fetchScores();
  };

  const resetScore = async () => {
    await API.graphql({
      query: updateScoreMutation,
      variables: {
        input: {
          id: scoresData && scoresData[0]?.id,
          score: 0,
          _version: scoresData && scoresData[0]._version,
        },
      },
    });
    fetchScores();
  };

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
        updateScoreWinning();
      }

      if (newPriceUp.price < oldPrice.price) {
        updateScoreLosing();
      }
    }
  }, [newPriceUp]);

  useEffect(() => {
    if (newPriceDown && newPriceDown && oldPrice && oldPrice) {
      if (newPriceDown.price > oldPrice.price) {
        updateScoreLosing();
      }

      if (newPriceDown.price < oldPrice.price) {
        updateScoreWinning();
      }
    }
  }, [newPriceDown]);

  return (
    <>
      <Timer activate={isDisabled} />
      <LatestPrice />
      <div>{scoresData && scoresData[0].score}</div>
      <button onClick={resetScore}>reset</button>
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
