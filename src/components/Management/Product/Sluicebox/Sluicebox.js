import { useState, useEffect } from "react";
// add formik in here
import SearchResults from "./CatalogSearch";
import SluiceResponse from "./SluiceResponse";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import { BarcodeParser, BarcodeError } from "../../Applications/BarcodeParser.js";

export const Sluicebox = ({update}) => {
  const [query, setQuery] = useState();
  const [textQuery, setTextQuery] = useState();
  const [queryError, setQueryError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (BarcodeParser(String(e.searchQuery))) {
      setQueryError(false);
      setQuery(e);
      setTextQuery();
    } else {
      setQuery();
      setTextQuery(e);
    }
    document.getElementById("search").reset();
  };

  return (
    <div>

      <div>
        <div>
          <form
            name="search"
            id="search"
            onSubmit={onSubmit}
            style={{ maxWidth:"1000px",marginLeft:'auto',marginRight:'auto'}}
          >
            <input
              name="searchQuery"
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
        {query ? (
          <SluiceResponse query={query.searchQuery} update={update} />
        ) : textQuery ? (
          <SearchResults query={textQuery} />
        ) : null
        }
        <Card
          style={{
            marginLeft: "0px",
            marginRight: "auto",
            justifyContent: "space-around",
           
          }}
        >
          {queryError ? <BarcodeError /> : ""}
          
        </Card>
      </div>
    </div>
  );
}
