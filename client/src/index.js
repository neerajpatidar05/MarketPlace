import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "connection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Topbar from "components/topbar/Topbar";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Web3ReactProvider getLibrary={getLibrary}>
		<ToastContainer
			style={{ zIndex: 100000000000 }}
			position="top-right"
			autoClose={10000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<BrowserRouter>
				<Topbar />
				<App />
		</BrowserRouter>
	</Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
