import { Template } from "../Template/Template";
import {charities} from "../../charities";
import { Grid, Card, Tooltip, Typography, useMediaQuery } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import {Link} from "react-router-dom";
import { useHistory } from "react-router";

export const CharityList = () => {
    const pagination = new URLSearchParams(window.location.search);
    const history = useHistory();
    const page = pagination.get('page') ? pagination.get('page') : 1;
    const desktop = useMediaQuery('(min-width:800px)')
    
    return(
        <Template component={
            <>
                <Typography variant="h4" margin="10px">Charity sellers</Typography>
                <Grid container  maxWidth="800px" justifyContent="center" style={{marginTop:"20px",}}>
                    {charities.slice(21*(page - 1), 21*(page)).map((charity) => {
                        return(
                            <Grid item style={{margin:"10px", width:(desktop ? "200px" : "75%"), height:(desktop ? "300px" : "250px")}}>
                                <Link to={{pathname: `/charities/${charity.registrationId}`}} style={{textDecoration:"none"}}>
                                    <Tooltip title={charity.missionStatement} style={{size:"30px"}}>
                                        <Card>
                                        <img src={charity.logoImage.imageUrl} style={{width:(desktop ? "200px" : "100%"), height:(desktop ? "125px": "175px")}}/>
                                            <Typography style={{padding:"10px"}}><b>{charity.name}</b></Typography>
                                        </Card>
                                    </Tooltip>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
                <Pagination
                    count={Math.round(charities.length/20) - 4} // needs fixed
                    style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}
                    variant="outlined" color="primary"
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            component={Link}
                            //to={`/search/${params.query}?page=${item.page}`}
                            onClick={(e) => {
                                e.preventDefault();
                                history.push({pathname: `/charities`, search: `?page=${item.page}`})
                                window.scrollTo(0, 0);
                            }}
                            
                        />        
                        )}
                />    
            </>
        } />
    )

}