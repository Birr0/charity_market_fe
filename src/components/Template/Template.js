import { useSelector } from "react-redux";

import Navbar from "./Footer/Footer";
import Footer from "./Navbar/Navbar"
import {Loading} from "../Loading/Loading";

//component div needs theme padding?

export const Template = ({component}) => {
    //const loading = true;//useSelector(state => state.loading.loadingState);
    const loading = useSelector(state => state.loading.loadingState);
    
    return(
        <div style={{minHeight:"100%", position: "relative"}}>
            <Navbar />    
            
                <div> 
                    {component}
                </div>
            
            <Footer />
    
        </div>
    );
}

//Dont understand why component is rendered after footer to work...