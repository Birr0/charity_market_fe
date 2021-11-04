import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {Home} from "./components/Home/Home";
import {CategoryView} from "./components/Category/CategoryView";
import {Loading} from "./components/Loading/Loading";
import {ProductPage} from "./components/Product/ProductPage";
import { categories } from "./categories";
import { CategoryPage} from "./components/Category/CategoryPage";
import {SearchResults} from "./components/Search/SearchResults";
import {CharityList} from "./components/Charity/CharityList";
import { CharityShop } from "./components/Charity/CharityShop";
import { charities } from "./charities";
import { NotFound } from "./components/NotFound";
import { Checkout } from "./components/ShoppingBasket/Checkout";
import {About} from "./components/About";

function App() {

  return (
    <Router>
      <Switch>
      
        <Route exact path='/' component={Home} /> 
        <Route path='/about' component={About} />
        <Route path ="/search/:query" component={SearchResults} />
        <Route path="/product/:itemId" component={ProductPage} />
        
        {categories.map( (category, key) => {
          if(category.subcategories){
            return(
              <Route key={key} exact path={`/categories/${category.name}`} render={() => {
                return <CategoryPage category={category} />
              }} />
            ) 
            }
          else{
            return(
              <Route  key={key} exact path={`/categories/${category.name}`} render={() => {
                return <CategoryView category={category} category_name={category.name} subcategory_name={''} />
              }}/>
          )} 
          })}

          {categories.map( (category, k) => {
            if(category.subcategories){
              return(
                Object.keys(category.subcategories).map((key) => {
                  return(
                    <Route key={k} path={`/categories/${category.name}/${key}`} render={() => {
                      return <CategoryView category_name={category.name} subcategory_name={key} category={category} />
                    }}
                  />
                )})
              )
              }
              else{
                return 0
              }
            }
          )}
        
        
        <Route exact path="/charities" component={CharityList} />
        {charities.map((charity, key) => {
            return <Route key={key} path={`/charities/${charity.registrationId}`} render={() => {
              return(
                <CharityShop charity={charity} />
              )
            }} />
        })}
        <Route path="/wishlist" component={Checkout} />
        <Route path="/loading" component={Loading} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
