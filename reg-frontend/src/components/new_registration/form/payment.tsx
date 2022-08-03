import { Button } from 'flowbite-react'
import useStore  from '../../../store/new_registration.store'

const Payment = () => {
  const {registration_data}=useStore()

  // ------Initialising razor pay-------
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };






  const onMakePayment = async () => {

    //--------Initialize razor pay
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    
    }
    //-----------Create a new order
    const body = new FormData
    body.append('application_id',registration_data.application_id)
    
    const create_order_response = await fetch('http://localhost:8000/registration_application/create_order', {
        method: "POST",
      
        body: body,
      }
    )
    const order_data = await create_order_response.json()


    // --------Payment----
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Mizoram University",
      currency: order_data.currency,
      amount: order_data.amount,
      order_id: order_data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: async function (response: any) {
        // --confirm payment---
        // const res1 = await fetch("/api/confirm-payment",
        //   {
        //     method: "POST",
        //     body: JSON.stringify({
        //       payment_id: response.razorpay_payment_id,
        //       registrationData: registrationData,
        //     })
        //   }).then((t)=>t.json())
        //   setStatus(PaymentStatus.completed)
       
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Mizoram University",
        email: "webadmin@mzu.edu.in",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
  }

  return (
    <div className='p-10'>
      <div>
        <span>This is the payment site</span>
      </div>
      <div>
        <span>This is the final stage of the form submission</span>
        <p>Kindly check data for correctness</p>
        <Button
          onClick={() => {
            onMakePayment()
          }}
        >Make Payment</Button>
      </div>
    </div>
  )
}

export default Payment