import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid";
import { Card, useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Template } from "../Template/Template";
import { useDispatch } from "react-redux";
//category must be array of objects with title, information, description, image ...
import { addToCategoriesViewed } from "../../storage/userSlice";
import { addToCart } from "../../storage/basketSlice";
export const CategoryPage = ({category}) => {

    const desktop = useMediaQuery('(min-width:800px)');
    const direction = (desktop ? "row" : "column");
    const justifyContent = (desktop ? "center" : "center");
    const dispatch = useDispatch();

    return(
        <Template component={
            <>
                <div style={{margin:"10px"}}>
                    <Typography variant='h2'>{category.title}</Typography>
                </div>
                <Grid container direction={direction} spacing={5} justifyContent={justifyContent}>
                    {Object.keys(category.subcategories).map((key, value) => {
                        return(
                            <Grid item>
                                <Link to={{pathname:`/categories/${category.name}/${key}` }} style={{color:'black', textDecoration:"none"}}>
                                    <Card style={{width:(desktop ? "250px" : "75%"), marginLeft:(!desktop ? 'auto' : ''), marginRight:(!desktop ? 'auto' : '')}} onClick={() => {
                                        dispatch(addToCategoriesViewed(category['subcategories'][key]));
                                    }}>
                                        
                                        <img src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fv0XhXq26Lfio53VNI7Y_wHaEo%26pid%3DApi&f=1'} style={{width:"100%"}} />
                                        <Typography style={{padding:"10px"}}><b>{category.subcategories[key]['name']}</b></Typography>
                                    </Card>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
                
            </>
        }
        />
    );
}