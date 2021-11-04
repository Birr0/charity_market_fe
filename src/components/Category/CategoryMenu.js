import {categories} from "../../categories";
import {Grid, Card, useMediaQuery, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCatalogueBackdrop } from "../../storage/widgetSlice";
import { addToCategoriesViewed } from "../../storage/userSlice";

export const CategoryMenu = () => {
    const desktop = useMediaQuery('(min-width:500px)');
    
    const dispatch = useDispatch();

    const direction = (desktop ? "row" : "column");
    const justifyContent = (desktop ? "space-around" : "")
    return(
        <div>
            <Grid container direction={direction} justifyContent={justifyContent} spacing={50}>
                {categories.map((category) => {
                    return(
                        <Grid item>
                            <Link to={`/categories/${category.name}`} style={{textDecoration:"none"}}>
                                <Card style={{width:(!desktop ? "300px" : "275px"), marginLeft:(!desktop ? 'auto' : ''), marginRight:(!desktop ? 'auto' : ''), marginBottom:(!desktop ? "20px" : '10px')}} onClick={(e) => {
                                    dispatch(setCatalogueBackdrop(false));
                                    dispatch(addToCategoriesViewed(category));
                                }}>
                                    
                                    <img src={category.categoryImage ? category.categoryImage : ''} alt="" width="100%"/>
                                    <Typography style={{padding:"10px"}}><b>{category.title}</b></Typography>
                                </Card>
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}