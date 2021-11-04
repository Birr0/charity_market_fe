import Navbar from "./Footer/Footer";
import Footer from "./Navbar/Navbar"

export const Template = ({component}) => {    
    return(
        <div style={{minHeight:"100%", position: "relative"}}>
            <Navbar />    
            
                <div style={{marginTop:"80px"}}> 
                    {component}
                </div>
            
            <Footer />
        </div>
    );
}

//Dont understand why component is rendered after footer to work...