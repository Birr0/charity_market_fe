import {ManagementTemplate} from "../ManagementTemplate/ManagementTemplate.js";
import {CategoryForm} from "./CategoryForm";
import {CategoryCard} from "./CategoryCard";

import Typography from "@material-ui/core/Typography";

export const ManageCategories = () => {
    return(
        <ManagementTemplate component={
            <>
                <Typography variant="h3">Categories</Typography>
                <p>Add category</p>
                <CategoryForm />
                <CategoryCard />
                <li>Search categories</li>
                <p>List and Grid views of categories</p>
                
            </>
        } />
    )
}