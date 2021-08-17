import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Checkout} from "./components/ShoppingBasket/Checkout";
import {CategoryView} from "./components/Category/CategoryView";
import {Payment} from "./components/Payment/Payment";
import {PaymentSuccess} from "./components/Payment/PaymentSuccess";
import {PaymentFailure} from "./components/Payment/PaymentFailure";
import {BuyNow} from "./components/Payment/BuyNow";
import {Loading} from "./components/Loading/Loading";
import {ProductPage} from "./components/Product/ProductPage";


function App() {
 
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route path="/product/:sku" component={ProductPage} />
        <Route path="/catalogue/:category/:subCategory?" component={CategoryView} />
        <Route path='/checkout' component={Checkout}/>         
        <Route exact path="/payment" component={Payment}/>
        <Route path="/payment/success" component={PaymentSuccess} />
        <Route path="/payment/failure" component={PaymentFailure} />
        <Route path="/buy-now" component={BuyNow} />
        <Route path="/loading" component={Loading} />
      </Switch>
    </Router>
  );
}

export default App;
