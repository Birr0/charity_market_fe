import Backdrop from "@material-ui/core/Backdrop";
import { CategoryMenu } from "../../Category/CategoryMenu";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from "react-redux";

export const CatalogueDialog = () => {
    const desktop = useMediaQuery('(min-width:800px)');
    const catalogueBackdropState = useSelector(state => state.widget.catalogueBackdropState)
    return(
        <Backdrop open={catalogueBackdropState} style={{display:"block" ,alignItems:"flex-start", marginTop:(desktop? "60px" : "50px"),backgroundColor: "#e7e7e7", zIndex:"5", overflow:"auto" }}>
            <div style={{marginTop:"10px"}}>
                <CategoryMenu />
            </div>
        </Backdrop>
    );
}