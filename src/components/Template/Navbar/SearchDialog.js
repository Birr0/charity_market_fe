import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

//Add formik

export const SearchDialog = (open) => {
    return(
        <Backdrop  open={open} style={{backgroundColor: "#e7e7e7", position: 'absolute', height: "40%",zIndex:"10", opacity:"1"}}>   
            <Grid container alignItems='center' direction='row' spacing={2}>
                <Grid item>
                    <TextField id="outlined-basic" variant="outlined" style={{marginTop:"30px", backgroundColor:"white"}} autoFocus='true' />
                </Grid>
                <Grid item>
                    <IconButton>
                        <Search style={{fontSize:"30px"}} alingItems={'center'}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Backdrop>
    );
}