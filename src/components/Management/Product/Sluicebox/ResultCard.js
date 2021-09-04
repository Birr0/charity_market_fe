import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import SluiceboxResponse from "./SluiceResponse";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

export default function ResultCard({ title, image, gtin }) {
  const [productSluiceboxOpen, setProductSluiceboxOpen] = useState();
  const handleClick = (e) => {
    console.log(e);
    setProductSluiceboxOpen(true);
  };

  //fix  line 59 for dialog ...

  return (
    <>
      {productSluiceboxOpen ? (
        <>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={productSluiceboxOpen}
            onClose={() => setProductSluiceboxOpen(false)}
            aria-labelledby="max-width-dialog-title"
          >
            {gtin !== undefined ? <SluiceboxResponse query={gtin[0]} /> : ""}
          </Dialog>
        </>
      ) : (
        <Card onClick={(e) => handleClick(e)}>
          <img src={image} style={{ maxWidth: "225px", maxHeight: "225px" }} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {title}
            </Typography>
            <Typography color="textSecondary" component="p">
              {gtin}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}