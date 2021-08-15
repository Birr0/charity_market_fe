import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {CardSection} from './CardSection';
import { useFormik } from "formik";
import * as Yup from "yup";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Button from "@material-ui/core/Button";

export default function CheckoutForm() {

  const stripe = useStripe();
  const elements = useElements();

  const formik = useFormik({
    initialValues:{
      name: '', // preload if user is signed
      email: '',
      addressLine1: '',
      addressLine2: '',
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
      
      city: Yup.string().max(60).required('City is required'),

      email: Yup.string().email('Invalid email address').required('An e-mail address is required.'),

    }),

    onSubmit: values => {

      alert(JSON.stringify(values, null, 2));

      
    },
  });

  const handleStripeRequest = async () => {
  
    if (!stripe || !elements) {
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
    }
  
    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
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
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

  return (
        <Paper style={{marginTop: '10px',maxWidth:"600px", padding:"20px", justifyContent:"center"}}>
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

                <div style={{maxWidth:"300px", marginTop:"20px"}}>
                    <CardSection />
                </div>
                <br></br>
                <Button disabled={!stripe} variant="outlined">Confirm order</Button>
            </form>
        </Paper>
  );
}