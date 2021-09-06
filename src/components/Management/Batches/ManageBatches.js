import { ManagementTemplate } from "../ManagementTemplate/ManagementTemplate";
import {useState} from "react";
import { Batches } from "./Batches";
import { BatchForm } from "./BatchForm";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const ManageBatches = () => {
    
    const [openNewBatch, setOpenNewBatch] = useState(false);

    return(
        <ManagementTemplate component={
           <>
                <Typography variant="h3">Batches</Typography>
                
                <Batches />
                
                <Typography variant="h5">Add batch 
                
                <IconButton onClick={(e) => {
                    e.preventDefault();
                    setOpenNewBatch(!openNewBatch);
                }}>
                    <AddCircleOutlineIcon />

                </IconButton>

                </Typography>
                {openNewBatch ? 
                    <BatchForm />
                    : null
                }
                <Typography variant="h5">Batch view table</Typography>
            </>
        } />
        
    )
}