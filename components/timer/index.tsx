import { useEffect, useState } from "react";
import { ActivateProps } from "../interfaces/activateProps";
import { setTimeout } from "worker-timers";

export const Timer = ({ activate }: ActivateProps) => {
  const [counter, setCounter] = useState(60);

  if (activate == true) {
    setTimeout(() => setCounter(counter - 1), 1000);
  }

  useEffect(() => {
    if (activate == false) {
      setCounter(60);
    }
  }, [counter]);

  return (
    <div className="mx-auto text-red-600">
      {counter == 60 ? null : <div>Next Guess Available In: {counter} </div>}
    </div>
  );
};
