import { useState, useEffect } from 'react';
import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import '../styles/CheckoutForm.css'
import Axios from 'axios';
import {useParams} from 'react-router-dom'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = () => {
  const [error, setError] = useState(null);  const stripe = useStripe();
  const elements = useElements();
  const [countries, setCountries] = useState({});
  const [cardHolderName, setCardHolderName] = useState()
  const [email, setEmail] = useState()
  const [selectedCountry, setSelectCountry] = useState()
  const {price, description} = useParams()
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/payment/make-payment").then(response => {
        console.log(response.data)
        setCountries(response.data.countries)
    }).catch(error=> {
      console.log("Fail to load countries")
    })
  }, [])

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  async function stripeTokenHandler(name, email,country, price,description) {
    const response = await fetch('http://127.0.0.1:8000/payment/make-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email: email, country: country, price: price, description: description})
    });
    Axios.post('http://127.0.0.1:8000/payment/make-payment', {name: name, email: email, country: country, price: price, description: description}).then(response => {
      if(response.data.success){
        var client_secret = response.data.client_secret;
        console.log(response.data)
          stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: cardHolderName,
            },
          }
        }).then(result =>{
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert(result.error.message);
          } else {
            // The payment has been processed!
            console.log(result)
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              alert("Payment success");
            }
          } 
        })
      }
      else{
        alert(response.data.message)
      }
    }).catch(error => {
      alert(error.message);
    })
    return response.json();
  }
  

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if(!email || !selectedCountry || !cardHolderName){
      setError(
        "Form contains error"
      )
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
      setError("Invalid email")
    }
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      console.log(cardHolderName)
      console.log(email)
      console.log(selectedCountry)
      stripeTokenHandler(cardHolderName, email, selectedCountry, price, description);
    }
  };
  const country_list = []
  if(countries){
    for(var i in countries){
      country_list.push(<option value={i} key={i}>{countries[i]}</option>);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
      <label htmlFor="cardHolderName">
          Card holder name: 
      </label>
      <input name="cardHolderName" id="cardHolderName" value={cardHolderName} placeholder="Card holder name" onChange={e => setCardHolderName(e.target.value)} required/>
      </div>

      <div className="form-row">
      <label htmlFor="email">
          Email 
      </label>
      <input name="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
      </div>

      <div className="form-row">
        <label htmlFor="countries">Countries</label>
        <select id="countries" onChange={e => setSelectCountry(e.target.value)} required>
            {country_list}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="card-element">
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <button type="submit" className="btn btn-dark">Submit Payment</button>
    </form>
  );
}

// Setup Stripe.js and the Elements provider
// POST the token ID to your backend.
export default CheckoutForm