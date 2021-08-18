import { useSelector } from "react-redux";


import Navbar from "./Footer/Footer";
import Footer from "./Navbar/Navbar"
import {Loading} from "../Loading/Loading";

export const Template = ({component}) => {
    //const loading = true;//useSelector(state => state.loading.loadingState);
    const loading = useSelector(state => state.loading.loadingState);
    console.log(loading);
    return(
        <div style={{position:'relative', minHeight:"100vh"}}>
            <Navbar />    
            
                <div style={{paddingTop:"60px"}}>
                    {component}
                    <p>{JSON.stringify(loading)}</p> 
                </div>
            
            <Footer />
            
        
        </div>
    );
}

//Dont understand why component is rendered after footer to work...