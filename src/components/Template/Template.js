import Navbar from "./Footer/Footer";
import Footer from "./Navbar/Navbar"

export const Template = ({component}) => {
    return(
        <div>
            <Navbar style={{marginBottom:'10px'}} />
            {component} 
            <Footer />
        </div>
    );
}

//Dont understand why component is rendered after footer to work...