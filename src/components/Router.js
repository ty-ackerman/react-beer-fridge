import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import NotFound from "./NotFound";
import HouseChooser from "./HouseChooser";

//This is the default template for React Router

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/house/" component={HouseChooser} />
      <Route path="/house/:houseId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
