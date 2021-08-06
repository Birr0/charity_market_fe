import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid";

//category must be array of objects with title, information, description, image ...

export const CategoryArray = ({categories}) => {
    return(
        <div style={{marginTop: '80px'}}>
            <Typography>*Categories</Typography>
            <Grid container>
            {categories.map((category) => {
                return(
                    <Grid item>
                        <p>*Add image</p>
                        <p>{category}</p>
                    </Grid>
                );
            })}
            </Grid>
        </div>
    );
}