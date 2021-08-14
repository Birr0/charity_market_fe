import {Template} from "../Template/Template";
//import {ProductArray} from "../Product/ProductArray";
import Typography from "@material-ui/core/Typography";
import {useParams} from "react-router-dom";

export const CategoryView = () => {
    const params = useParams();
    return(
        <Template component={
        <div style={{marginTop:"80px"}}>
            <Typography>
                <a href="/">Home | </a>
                 
                <a href={`/catalogue/${params.category}`} > {params.category}</a>
                
                {params.subCategory ? <> <a href={params.subCategory}> | {params.subCategory}</a></> : null}
            </Typography>
        </div>
        }
        />
    );
}