import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {useState} from "react";
import {CardSection} from './CardSection';
import { useFormik } from "formik";
import * as Yup from "yup";
import {Redirect} from "react-router-dom";
import {Get} from "../../api/fetchWrapper";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../../storage/loadingSlice";
import {Loading} from "../Loading/Loading";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Button from "@material-ui/core/Button";

export default function CheckoutForm() {

  const stripe = useStripe();
  const elements = useElements();

  const [stripeError, setStripeError] = useState({});
  const [stripeSuccess, setStripeSuccess] = useState(false);
  
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loadingState);

  useState(() => {
    setStripeSuccess(null);
    setStripeError({error: false, msg: null})
  })
  const formik = useFormik({
    initialValues:{
      _name: '', // preload if user is signed
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
    },
    validationSchema: Yup.object({

      _name: Yup.string()

        .max(60)

        .required('Name is required'),

      addressLine1: Yup.string()

        .max(60)

        .required('An address is required'),
      
      addressLine2: Yup.string()

        .max(60, 'Must be 20 characters or less'),
      
      city: Yup.string().max(60).required('City/Town is required'),

      email: Yup.string().email('Invalid email address').required('An e-mail address is required.'),

    }),

    onSubmit: values => {

      //alert(JSON.stringify(values, null, 2));
      Get('/payment').then(result => {
        handleStripeRequest(result['client_secret']);
      });
      
    },
  });

  const handleStripeRequest = async (clientSecret) => {

    dispatch(setLoading({loading: true}));


    if (!stripe || !elements || !clientSecret) {
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    console.log('Failure');
    console.log(clientSecret);
    return;
    }
    
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: formik.values.name,
        },
      }
      
    });
  
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      setStripeError({error: true, msg: result.error.message })
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log(result.paymentIntent);
        setStripeSuccess(true);
        dispatch(setLoading({loading: false}));
        
      }
    }
  }

  return (
    <>
      {loading ? <Loading /> : null}
        <Paper style={{marginTop: '10px',maxWidth:"600px", padding:"20px", justifyContent:"center"}}>
            {stripeError.error ? <Alert severity="error">{stripeError.msg}</Alert> : null}
            {stripeSuccess ? <Redirect to="/payment/success" /> : null}
            <form onSubmit={formik.handleSubmit}>
                <TextField id="_name" name="_name" label="name" variant="filled" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                {formik.touched._name && formik.errors._name ? (
                  <Alert severity="error" style={{maxWidth:"50%"}}>{formik.errors._name}</Alert>
                  ) : null}
                <br></br>
                
                <TextField id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} variant="filled" label="e-mail address" />
                {formik.touched.email && formik.errors.email ? (
                  <Alert severity="error" style={{maxWidth:"50%"}}>{formik.errors.email}</Alert>
                  ) : null}
                <br></br>
               
                <TextField type="text" 
                id="addressLine1"

                name="addressLine1"
       
                type="text"
       
                onChange={formik.handleChange}
       
                onBlur={formik.handleBlur}
       
                value={formik.values.addressLine1}
                
                variant="filled" 
                
                label="Address Line 1"/>
                {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                  <Alert severity="error" style={{maxWidth:"50%"}}>{formik.errors.addressLine1}</Alert>
                  ) : null}
                <br></br>
                
                <TextField type="text" 
                id="addressLine2"

                name="addressLine2"
       
                type="text"
       
                onChange={formik.handleChange}
       
                onBlur={formik.handleBlur}
       
                value={formik.values.addressLine2}
                
                label="Address Line 2"

                variant="filled"
                />
                <br></br>
                <TextField type="text" 
                id="city"

                name="city"
       
                type="text"
       
                onChange={formik.handleChange}
       
                onBlur={formik.handleBlur}
       
                value={formik.values.city}
                
                label="City/Town"

                variant="filled"
                />
                <br></br>
                {formik.touched.addressLine1 && formik.errors.city ? (
                  <Alert severity="error" style={{maxWidth:"50%"}}>{formik.errors.city}</Alert>
                  ) : null}
                
                <br></br>

                <div style={{maxWidth:"300px", marginTop:"20px"}}>
                    <CardSection />
                </div>
                <br></br>
                <Button disabled={!stripe} variant="outlined" onClick={formik.handleSubmit}>Confirm order</Button>
            </form>
        </Paper>
      
      </>
  );
}