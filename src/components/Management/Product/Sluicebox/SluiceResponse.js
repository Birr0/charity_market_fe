import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Loading} from "../../../Loading/Loading";
import { LongMenu } from "./PriceTable.js";
import {Get} from "../../../../api/fetchWrapper";
//import {ProductView} from "../../../Product/ProductView.js"
import {ProductForm} from "../ProductForm";
import {useFormik, Formik, FastField } from "formik";
import SearchResults from "./CatalogSearch";
import SearchIcon from "@material-ui/icons/Search";
import { BarcodeParser, BarcodeError } from "../../Applications/BarcodeParser.js";


function SluiceResponse() {
  
  const [loading, setLoading] = useState(true);
  const [catalogInfo, setCatalogInfo] = useState();
  const [catalogInfoError, setCatalogInfoError] = useState(false);
  const [listingInfo, setListingInfo] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [usedPriceColor, setUsedPriceColor] = useState("");
  const [newPriceColor, setNewPriceColor] = useState("");

  const [query, setQuery] = useState();

  const [barcodeQuery, setBarcodeQuery] = useState(false);
  const [textQuery, setTextQuery] = useState(false);
  const [queryError, setQueryError] = useState(false);

  const [response, setResponse] = useState();


  return (
    <div>
      <Formik
        initialValues={{ query: '' }}

        onSubmit={(values, actions) => {
 
          if (BarcodeParser(String(values.query))) {
            setQueryError(false);
            setBarcodeQuery(true);
            setTextQuery(false);
          } else {
            setBarcodeQuery(false);
            setTextQuery(true);
          }
          setLoading(true);
          setCatalogInfoError(false);
          setCatalogInfo();
          setListingInfo();
          setDescription();
          setCategory();
    
        Get(`/products/?gtin=${values.query}`).then(
          response => {
            console.log(response);        
            setResponse(response);
            if(response.status_code === 200){
              setCatalogInfoError(false);
              setCatalogInfo(response.catalog);
              console.log(response);
              setListingInfo(response.browse);
              response.details.category ? setCategory(response.details.category): setCategory('Recently Added');
              response.details.catalogResponse.description ? setDescription(response.details.catalogResponse.description) : setDescription('');
                  
            if (response.used_price > 7.0) {
                setUsedPriceColor("#61B329");
              } else {
                setUsedPriceColor("red");
              }
              if (response.new_price > 7.0) {
                setNewPriceColor("#61B329");
              } else {
                setNewPriceColor("red");
              }
    
          }
          else{
                setCatalogInfo();
                setListingInfo('');
                setCatalogInfoError(true);
                setLoading(false);
          }
        }
        ).then(() => setLoading(false));
          document.getElementById("query").reset();
 
        }}
        >

   {({ handleSubmit, handleChange, handleBlur, values, errors }) => (

     <form onSubmit={handleSubmit}>

       <FastField

         type="text"

         //onChange={handleChange}

         onBlur={handleChange}

         value={values.query}

         name="query"

         id="query"

       />

       

       <button type="submit">Submit</button>

     </form>

   )}

 </Formik>
    
        <div style={{margin: "30px",maxWidth:"900px", maxHeight:"600px"}}>
          
          {catalogInfoError ? (
            <p>Cant find product</p>
          ) : (
            ""
          )}

          {catalogInfo && listingInfo ?
            <ProductForm update={false} loading={loading} productData={catalogInfo ? {'title': catalogInfo.summaryResponse.productSummaries[0].title, 'price': listingInfo.used_price, 'image_url': catalogInfo.summaryResponse.productSummaries[0].image ? catalogInfo.summaryResponse.productSummaries[0].image.imageUrl: "", 'category': category, 'description': response.details.catalogResponse.description , 'quantity': 1 , 'batch_identifier': null, 'sku': ''} : null} />
          : !catalogInfoError ? <><Loading /><p>Searching</p></> : null }

              {listingInfo && catalogInfo ? 
              <Card>
                <Grid container spacing={2} justify="space-evenly">
                  <Grid item>
                    <Card style={{ marginTop: "1px" }}>
                      <p>Supply: {listingInfo.total}</p>
                    </Card>
                    <Card>
                      <p>Demand: </p>
                    </Card>
                  </Grid>

                  <Grid item>
                    <Card style={{ backgroundColor: usedPriceColor }}>
                      <p style={{ fontWeight: "600" }}>
                        RRP used: £{listingInfo.used_price}
                      </p>
                    </Card>
                    <LongMenu
                      options={listingInfo.usedItems}
                      title="Used Prices"
                      id={1}
                    />
                  </Grid>
                  <Grid item>
                    <Card style={{ backgroundColor: newPriceColor }}>
                      <p style={{ fontWeight: "600" }}>
                        RRP new: £{listingInfo.new_price}
                      </p>
                    </Card>
                    <Card>
                      <LongMenu
                        options={listingInfo.newItems}
                        id={2}
                        title="New prices"
                      />
                    </Card>
                  </Grid>

                </Grid>
              </Card>
              : <ProductForm update={false} />}
            
        </div>
      
    </div>
  );
}

export default SluiceResponse;

/*

Get(`/ebay/items/listed-items?q=${query}`).
    then(response => {

      setListingInfo(response);
      setPrice(response.used_price);
        if (response.used_price > 7.0) {
          setUsedPriceColor("#61B329");
        } else {
          setUsedPriceColor("red");
        }
        if (response.new_price > 7.0) {
          setNewPriceColor("#61B329");
        } else {
          setNewPriceColor("red");
        } 
    });

    Get(`/ebay/catalog?gtin=${query}`).
    then(response => {
      console.log(response);
      if (
        response.status_code === 200 
      ) {
        setCatalogInfoError(false);
        
        setCatalogInfo(response);
        
        
      } else {
        setCatalogInfo();
        setListingInfo();
        setCatalogInfoError(true);
        
        setLoading(false);
      }
      Get(`/product-storage/product-details?ePid=${response.epid}`).
      then(response => {
        console.log(response);
        
        response.category ? setCategory(response.category): setCategory('Recently Added');
        response.catalogResponse.description ? setDescription(response.catalogResponse.description) : setDescription('');
       
      }).then(
        () => setLoading(false)
      )
      
    });
*/