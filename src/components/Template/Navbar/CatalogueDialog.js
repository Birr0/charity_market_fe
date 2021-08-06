import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export const CatalogueDialog = (open) => {
    return(
        <Backdrop  open={open} style={{backgroundColor: "#e7e7e7", position: 'absolute',height:"100%", zIndex:"10", opacity:"1.0"}}>
            <Grid container spacing={3}>
                <Grid item>
                    <Typography>Category 1</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 2</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category 3</Typography>
                    <Typography>- Sub-Category 1</Typography>
                    <Typography>- Sub-Category 2</Typography>
                    <Typography>- Sub-Category 3</Typography>
                </Grid>
            </Grid>
        </Backdrop>
    );
}