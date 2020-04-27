import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import URL from "url-parse";

const stripePromise = loadStripe("pk_test_xWT4tvG235qCFeW2nTWQVTnQ");

const goToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    return console.warn(stripe);
  }
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });
  console.log(error);
};

const url = new URL(window.location.href, true);
console.log(url.query);
const sessionId = url.query.sessionId;
if (sessionId) {
  goToCheckout(sessionId);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
