import { useState } from "react";
import {Tooltip, Input, IconButton} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

// add formik here for api calls

export const BatchTableRow = ({product}) => {
    const [edit, setEdit] = useState(false);
    const {title, barcode} = Object.entries(product)[0] ? Object.entries(product)[0][1] : {'title': '-', 'barcode' : '-'};
    
    return(
    <tr>
        <td>
            <Tooltip title="Edit">
                <IconButton onClick={(e) => {
                    e.preventDefault();
                    setEdit(!edit);
                }}>
                    <EditIcon style={{color: "black"}} />
                </IconButton>
            </Tooltip>
        </td>
        <td>
            <Tooltip title="Change photo">
                <img src="https://icon2.cleanpng.com/20180418/egq/kisspng-computer-icons-5ad6fb7c094293.2646055315240385240379.jpg" style={{width:"50px" }}/>
            </Tooltip>
        </td>
        <td>{Object.keys(product)}</td>
        <td>
            <Input type="text" placeholder={title} value={title} style={{border:'none'}} disabled={!edit} />
        </td>
        <td>{barcode}</td>
        
        {edit ? 
            <>
                <td>
                    <Tooltip title="Save">
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                        }}>
                            <CheckIcon style={{color: "green"}} />
                        </IconButton>
                    </Tooltip>
                </td>
                <td>
                <Tooltip title="Delete">
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                        }}>
                            <DeleteForeverIcon style={{color: "red"}} />
                        </IconButton>
                    </Tooltip>
                </td>   
            </>
                
                : null}
    </tr>
  
    )
}