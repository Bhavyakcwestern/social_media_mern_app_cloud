import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import reducers from "./reducers";
import AuthLayout from "./components/AuthLayout";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<AuthLayout />} />
            </Routes>
        </Router>
    </Provider>
);
