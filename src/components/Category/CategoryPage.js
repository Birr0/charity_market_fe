import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid";
import { Card, useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Template } from "../Template/Template";
import { useDispatch } from "react-redux";
//category must be array of objects with title, information, description, image ...
import { addToCategoriesViewed } from "../../storage/userSlice";
export const CategoryPage = ({category}) => {

    const desktop = useMediaQuery('(min-width:800px)');
    const direction = (desktop ? "row" : "column");
    const justifyContent = (desktop ? "center" : "center");
    const dispatch = useDispatch();

    return(
        <Template component={
            <>
                <div style={{margin:"10px"}}>
                    <Typography variant='h5'>{category.title}</Typography>
                </div>
                <Grid container direction={direction} spacing={5} justifyContent='center'>
                    {Object.keys(category.subcategories).map((key, value) => {
                        return(
                            <Grid item>
                                <Link to={{pathname:`/categories/${category.name}/${key}` }} style={{color:'black', textDecoration:"none"}}>
                                    <Card style={{width:(desktop ? "250px" : "300px"), marginLeft:(!desktop ? 'auto' : ''), marginRight:(!desktop ? 'auto' : '')}} onClick={() => {
                                        dispatch(addToCategoriesViewed(category['subcategories'][key]));
                                    }}>  
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

//<img src={category['subcategories'][key]['subcategoryImage'] ? category['subcategories'][key]['subcategoryImage'] : ''} style={{ width: (desktop ? "250px" : "300px"), height:"200px"}}/>