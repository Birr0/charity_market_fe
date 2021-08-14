import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {CardSection} from './CardSection';
import { useFormik } from "formik";
import * as Yup from "yup";

import Paper from "@material-ui/core/Paper";





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

      name: Yup.string()

        .max(15, 'Must be 15 characters or less')

        .required('Required'),

      addressLine1: Yup.string()

        .max(20, 'Must be 20 characters or less')

        .required('Required'),
      
      addressLine1: Yup.string()

        .max(20, 'Must be 20 characters or less')

        .required('Required'),

      email: Yup.string().email('Invalid email address').required('Required'),

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
        <Paper style={{marginTop: '10px',maxWidth:"600px", padding:"20px"}}>
            <form onSubmit={formik.handleSubmit}>
                <label>Name:</label>
                <input type="text" id="name" name="name"
                onChange={formik.handleChange}

                onBlur={formik.handleBlur}
       
                value={formik.values.firstName}
                />
                <br></br>
                <label>e-mail address:</label>
                <input 
                  id="email"

                  name="email"
        
                  type="email"
        
                  onChange={formik.handleChange}
        
                  onBlur={formik.handleBlur}
        
                  value={formik.values.email}/>
                <br></br>
                <label>Address line 1</label>
                <input type="text" 
                id="addressLine1"

                name="addressLine1"
       
                type="text"
       
                onChange={formik.handleChange}
       
                onBlur={formik.handleBlur}
       
                value={formik.values.addressLine1}/>
                <br></br>
                <label>Address line 2</label>
                <input type="text" 
                id="addressLine2"

                name="addressLine2"
       
                type="text"
       
                onChange={formik.handleChange}
       
                onBlur={formik.handleBlur}
       
                value={formik.values.addressLine2}/>
                <br></br>
                {formik.touched.email && formik.errors.email ? (

                  <div>{formik.errors.email}</div>

                  ) : null}
                  <br></br>

                <div style={{maxWidth:"300px"}}>
                    <CardSection />
                </div>
                <button disabled={!stripe}>Confirm order</button>
            </form>
        </Paper>
  );
}