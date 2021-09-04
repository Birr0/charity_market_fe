import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Loading} from "../../../Loading/Loading";
import { LongMenu } from "./PriceTable.js";
import {Get} from "../../../../api/fetchWrapper";
import {ProductView} from "../../../Product/ProductView.js"

function SluiceResponse({ query }) {
  console.log(query);
  
  const [loading, setLoading] = useState(true);
  const [catalogInfo, setCatalogInfo] = useState();
  const [catalogInfoError, setCatalogInfoError] = useState(false);
  const [listingInfo, setListingInfo] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [usedPriceColor, setUsedPriceColor] = useState("");
  const [newPriceColor, setNewPriceColor] = useState("");


  useEffect(() => {
    setLoading(true);
    setCatalogInfoError(false);
    setCatalogInfo();
    setListingInfo();
    setDescription();
    setCategory();

    Get(`/products/?gtin=${query}`).then(
      response => {
        

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
    
  
  }, [query]);

  return (
    <>
        <div style={{maxWidth:"900px", maxHeight:"600px"}}>
          
          {catalogInfoError ? (
            <p>Cant find product</p>
          ) : (
            ""
          )}
          {catalogInfo && listingInfo ?
            <ProductView update={false} loading={loading} productData={catalogInfo ? {'Product Name *': catalogInfo.summaryResponse.productSummaries[0].title, 'Selling Price *': listingInfo.used_price, 'Image URL': catalogInfo.summaryResponse.productSummaries[0].image ? catalogInfo.summaryResponse.productSummaries[0].image.imageUrl: "", 'Category *': category, 'Product Description': description , 'Current Stock Level': 1 , 'batch_number': 0, 'Product Code/SKU *': '', 'Barcode': ''} : null} />
          : !catalogInfoError ? <><Loading /><p>Searching for {query}</p></> : null }
              <br></br>
              <br></br>
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
              : null}
            
        </div>
      
    </>
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