import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { processStore } from "./stores/processStore";
import { loadStripe } from "@stripe/stripe-js";
import { shell } from "electron";
import { MainView } from "./views/mainView";
import "react-toggle/style.css";
// import "./burger.css";

// const stripePromise = loadStripe("pk_test_xWT4tvG235qCFeW2nTWQVTnQ");

// processStore.afterCreate();
const App: React.FC = () => {
  return (
    <div className="App">
      <MainView />
      {/* <header className="App-header">
        <a
          target="_blank"
          href={
            "http://localhost:3009/?sessionId=cs_test_dUVjxb6XLllAHouqSJpLnUbeMPRQitHnovKSixxyfi4pW7SyiLLVtMe3"
          }
        >
          PAY
        </a>
      </header> */}
    </div>
  );
};

export default App;
