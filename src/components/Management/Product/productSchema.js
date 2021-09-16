import * as Yup from 'yup';

//getProductSchema from backend? Makes this customizable

export const productSchema = Yup.object().shape({
    sku: Yup.string(),
    title: Yup.string().required('A title is required'),
    subtitle: Yup.string(),
    price: Yup.number().required('Enter a valid price').positive(),
    description: Yup.string(),
    category: Yup.string(), //.required(),
    image_url: Yup.string(),        
    batch_identifier: Yup.string(),
    quantity: Yup.number() //.required('Enter quantity of item').positive(),
    //barcode: productData ? productData['Barcode'] : 'test barcode',
    //sku: productData ? productData['Product Code/SKU *'] : ''
})