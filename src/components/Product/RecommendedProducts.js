import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Get, Post } from "../../api/fetchWrapper"
import { setLoading } from "../../storage/loadingSlice"
import {ProductArray} from "./ProductArray";

export const RecommendedProducts = () => {
    
    const userInteractions = useSelector(state => state.user);
    const wishlist = useSelector(state => state.basket.cart)
    const [products, setProducts] = useState();
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        Post('/recommended-products', {'interactions':userInteractions, 'wishlist': wishlist}).then(
            result => Get(`/categories/${result.recommended_category}?limit=5&page=5`)).then(
                result => {
                    //console.log(result);
                    setProducts(result);
                    dispatch(setLoading(false));
                }
        )
    }, [])
    
    return(
        products ? 
        <div style={{marginTop:"20px"}}>
            <ProductArray products={products} />
        </div>
        : null
    )

}