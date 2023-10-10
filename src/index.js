import App from "@/App";
import "@/index.css";
import store from "@/redux/store";
import reportWebVitals from "@/reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxStoreProvider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
