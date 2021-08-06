import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Checkout} from "./components/ShoppingBasket/Checkout";
import {CategoryView} from "./components/Category/CategoryView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route path exact path="/catalogue" />
        <Route path="/catalogue/:category/:subCategory?" component={CategoryView} />
        <Route path='/checkout' component={Checkout}/>         
      </Switch>
    </Router>
  );
}

export default App;
