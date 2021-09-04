import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ResultCard from "./ResultCard.js";
import {Loading} from "../../../Loading/Loading";
import ErrorAlert from "../../Alerts/ErrorAlert";
import {Get} from "../../../../api/fetchWrapper";

function SearchResults({ query }) {
  const [results, setResults] = useState();
  const [searchError, setSearchError] = useState(false);
  
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (query !== undefined) {
      const params = new URLSearchParams({ q: query.searchQuery }).toString();
      console.log(params);
      setLoading(true);
      Get("/ebay/catalog?" + params).then((response) => {
        try {
        setResults(response.summaryResponse.productSummaries);
        setSearchError(false);
      } catch {
        console.log(response);
        setSearchError(true);
        console.log("No listings");
      }
      setLoading(false);
    });
    } 
  }, [query]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : searchError ? (
        <div>
          <ErrorAlert message={`Can't find ${query.searchQuery}`} />
        </div>
      ) : (
        <div style={{ marginTop: "70px" }}>
          <p
            style={{
              fontSize: "medium",
              marginLeft: "50px",
            }}
          >
            Search results for ' {query.searchQuery} '
          </p>
          <Grid container spacing={2} justify="center">
            {results !== undefined
              ? results.map((catalogItem) => {
                  return (
                    <Grid item>
                      <ResultCard
                        title={catalogItem.title}
                        image={
                          catalogItem.image ? catalogItem.image.imageUrl : ""
                        }
                        gtin={catalogItem.gtin}
                      />
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </div>
      )}
    </>
  );
}

export default SearchResults;