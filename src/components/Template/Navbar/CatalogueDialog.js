import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { CategoryMenu } from "../../Category/CategoryMenu";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from "react-redux";

export const CatalogueDialog = () => {
    const desktop = useMediaQuery('(min-width:800px)');
    const catalogueBackdropState = useSelector(state => state.widget.catalogueBackdropState)
    return(
        <Backdrop open={catalogueBackdropState} style={{display:"block" ,alignItems:"flex-start", marginTop:(desktop? "60px" : "50px"),backgroundColor: "#e7e7e7", zIndex:"5", overflow:"auto" }}>
            <div>
                <Typography variant='h2' style={{margin:"10px"}}>Categories</Typography>
                <hr></hr>
                <CategoryMenu />
            </div>
        </Backdrop>
    );
}