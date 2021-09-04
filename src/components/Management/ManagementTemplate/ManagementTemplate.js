// includes template for admin aspects of website ...
import {Template} from "../../Template/Template"
import { AppBar, Toolbar, Tooltip, Typography } from "@material-ui/core"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Link} from "react-router-dom";
import {useStyles} from "../../Styles/Styles.js";
import { Grid } from "@material-ui/core";

export const ManagementTemplate = ({component}) => {

    const desktop = useMediaQuery('(min-width:600px)')
    const classes = useStyles();

    const managementOptions = [
        {'name': 'Products', 'description': 'Manage products, product batches and categories', 'url': '/manage/products'},
        {'name': 'Orders', 'description': 'Orders, cancellations and returns','url': '/manage/orders'},
        {'name': 'Communications', 'description': 'e-mail, social-media and messages','url': '/manage/communications'},
        {'name': 'Business', 'description': 'Business management functions','url': '/manage/business'},
    ]

    return(
        <Template component={
            <div className={classes.root}>
                <AppBar position="static" className={classes.managementBar}>
                    <Toolbar style={{display: "flex", justifyContent:"space-between"}}>
                        {managementOptions.map((option) => {
                            return(
                                <Tooltip title={option.description}  className={classes.managementOption}>     
                                    <Link to={option.url} className={classes.link}>
                                        <Typography>{option.name}</Typography>
                                    </Link>
                                </Tooltip>                  
                            )
                        })}    
                       
                    </Toolbar>
                </AppBar>
                <div>
                    {component}
                </div>
            </div>
            
        } />
    )
}