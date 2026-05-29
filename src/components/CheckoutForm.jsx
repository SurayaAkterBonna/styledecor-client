import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ booking, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (booking?.cost) {
      axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, 
        { price: booking.cost },
        { headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` } }
      )
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(err => {
        console.error("Payment intent instantiation error:", err);
        toast.error("Failed to safely fetch payment engine parameters.");
      });
    }
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || processing) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: booking?.userEmail || 'anonymous@styledecor.com',
            name: booking?.userName || 'Valued Client',
          },
        },
      },
    );

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        bookingId: booking._id,
        transactionId: paymentIntent.id,
        price: booking.cost,
        userEmail: booking.userEmail,
        date: new Date(),
        serviceName: booking.service_name
      };

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/payments`, paymentInfo, {
          headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
        });
        toast.success('Luxury session cleared! System payment accepted.');
        onSuccess();
      } catch (err) {
        toast.error('Payment finalized, but failed to synchronize database logging records.');
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-[#181818] border border-white/5 rounded-xl">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '15px',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                '::placeholder': { color: '#666666' },
              },
              invalid: { color: '#ef4444' },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full btn btn-gold rounded-xl py-3 disabled:opacity-30 flex items-center justify-center space-x-2"
      >
        {processing ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <span>Clear Dues & Authorize (BDT {booking?.cost?.toLocaleString()})</span>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;