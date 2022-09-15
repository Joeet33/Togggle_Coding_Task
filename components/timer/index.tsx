import { useState } from "react";

interface ActivateProps {
  activate: any;
}

export const Timer = ({ activate }: ActivateProps) => {
  const [counter, setCounter] = useState(60);

  if (activate == true) {
    setTimeout(() => setCounter(counter - 1), 1000);
  }

  if (counter == 0) {
    setCounter(60);
  }

  return <div>Seconds: {counter == 60 ? null : counter}</div>;
};
