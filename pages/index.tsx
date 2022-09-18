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


const Home: NextPage = ({ signOut }:any) => {
  return ( <>

<View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  <MarketPriceGuess />
  </>)
};

export default withAuthenticator(Home);
