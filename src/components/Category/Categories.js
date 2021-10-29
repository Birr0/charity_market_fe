import {Template} from "../Template/Template";
import { CategoryArray } from "./CategoryArray";

export const Categories = () => {
    return(
        <Template component={
            <div style={{marginTop:"10px"}}>
                <h1>Categories</h1>
                <CategoryArray />
            </div>
        }
        />
    );
}