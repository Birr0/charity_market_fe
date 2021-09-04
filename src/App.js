import React from "react";
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
import { ManageProducts } from "./components/Management/Product/ManageProducts";
import { ManageOrders } from "./components/Management/Order/ManageOrders.js";
import { ManageCommunications } from "./components/Management/Communications/ManageCommunications";
import { ManageBusiness } from "./components/Management/Business/ManageBusiness.js";


import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_51JPmphCtX7dC5Py8jrseqN21xhYQA6NSkXvaGwSJLu9hm9OE5C1d0yKudXPD2QaUZzcxn2EhRQktbJC7lPeXD8ZS00LYeEdIyG");

function App() {
 
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route path="/product/:sku" component={ProductPage} />
        <Route path="/catalogue/:category/:subCategory?" component={CategoryView} />
        <Route path='/checkout' component={Checkout}/>         
        <Route exact path="/payment">
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/payment/success" component={PaymentSuccess} />
        <Route path="/payment/failure" component={PaymentFailure} />
        <Route exact path="/buy-now">
          <Elements stripe={stripePromise}>
            <BuyNow />
          </Elements>
        </Route>
        <Route path="/manage/products" component={ManageProducts} />
        <Route path="/manage/orders" component={ManageOrders} />
        <Route path="/manage/communications" component={ManageCommunications} />
        <Route path="/manage/business" component={ManageBusiness} />
        
        <Route path="/loading" component={Loading} />
      </Switch>
    </Router>
  );
}

export default App;
