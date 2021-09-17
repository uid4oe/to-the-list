import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";


import Firebase from "./firebase";

import Provider from "./Provider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FirebaseContext } from "./firebase/context";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Provider />
      </BrowserRouter>
    </DndProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
