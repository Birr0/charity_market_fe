import { useState } from "react";
import {useFormik} from "formik";
import SearchResults from "./CatalogSearch";
import SluiceResponse from "./SluiceResponse";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import { BarcodeParser, BarcodeError } from "../../Applications/BarcodeParser.js";
import { ProductForm } from "../ProductForm.js";

export const Sluicebox = ({update}) => {
  const [barcodeQuery, setBarcodeQuery] = useState(false);
  const [textQuery, setTextQuery] = useState(false);
  const [queryError, setQueryError] = useState(false);

  const formik = useFormik({
    initialValues: {
      query: null
    },
    onSubmit: values => {
      //e.preventDefault();
      if (BarcodeParser(String(values.query))) {
        setQueryError(false);
        setBarcodeQuery(true);
        setTextQuery(false);
      } else {
        setBarcodeQuery(false);
        setTextQuery(true);
      }
      document.getElementById("search").reset();
    }
    })

  //const onSubmit = (e) => {
    

  return (
    <div>

      <div>
        <div>
          <form
            name="search"
            id="search"
            onSubmit={formik.handleSubmit}
            style={{ maxWidth:"1000px",marginLeft:'auto',marginRight:'auto'}}
          >
            <input
              id="query"
              name="query"
              onChange={formik.handleChange}
              autoFocus
              //onBlur={({ target }) => target.focus()}
              //ref={register({ required: true })}
            />
            <button type="submit">
              <SearchIcon
                fontSize="large"
              />
            </button>
          </form>
        
        </div>
        {barcodeQuery ? (
          <SluiceResponse query={formik.values.query} update={update} />
        ) : textQuery ? (
          <SearchResults query={formik.values.query} />
        ) : null}
        }
        <Card
          style={{
            marginLeft: "0px",
            marginRight: "auto",
            justifyContent: "space-around",
           
          }}
        >
          {queryError ? <BarcodeError /> : null}
          
        </Card>
      </div>
    </div>
  );
}
