import type { NextPage } from "next";
import { MarketPriceGuess } from "../components/marketPriceGuess/index.";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
} from "@aws-amplify/ui-react";

const Home: NextPage = ({ signOut }: any) => {
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex">
        <div className="mr-auto p-4 text-3xl font-bold">Togggle Coding Test</div>
        <div className="ml-auto p-4">
          <View>
            <Button onClick={signOut}>Sign Out</Button>
          </View>
        </div>
      </div>
      <div className="m-auto">
        <MarketPriceGuess />
      </div>
    </div>
  );
};

export default withAuthenticator(Home);
