// import React,{useState,useEffect} from 'react'
// import { useRouter } from 'next/router'
// import IStudentRegistration from '../../lib/interface/IStudentRegistration';
// import {useRegistrationContext} from '../../context/registration.context'
// import PdfGeneration from './pdf-generation';

// interface props{
//   registrationData:IStudentRegistration
// }

// enum PaymentStatus{
//   notStarted,
//   fail,
//   completed
// }

// const Payment = () => {
 
//   const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.notStarted)
//   const {registrationData}=useRegistrationContext()
  
//   const router = useRouter();
//   // ------Initialising razor pay-------
//   const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";

//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };

//       document.body.appendChild(script);
//     });
//   };
//   //----Make payment
  
//   //---Make payment
//   const makePayment = async () => {
//     const res = await initializeRazorpay();

//     if (!res) {
//       alert("Razorpay SDK Failed to load");
//       return;
//     }
  
    

//     // Make API call to the serverless API
//     const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
//       t.json()
//     );
   

//     var options = {
//       key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//       name: "Mizoram University",
//       currency: data.currency,
//       amount: data.amount,
//       order_id: data.id,
//       description: "Thankyou for your test donation",
//       image: "https://manuarora.in/logo.png",
//       handler: async function (response: any) {
//         // --confirm payment---
//         const res1 = await fetch("/api/confirm-payment",
//           {
//             method: "POST",
//             body: JSON.stringify({
//               payment_id: response.razorpay_payment_id,
//               registrationData: registrationData,
//             })
//           }).then((t)=>t.json())
//           setStatus(PaymentStatus.completed)
       
//         // Validate payment at server - using webhooks is a better idea.
//         // alert(response.razorpay_payment_id);
//         // alert(response.razorpay_order_id);
//         // alert(response.razorpay_signature);
//       },
//       prefill: {
//         name: "Mizoram University",
//         email: "webadmin@mzu.edu.in",
//         contact: "9999999999",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };
  
//   switch (status) {
//     case PaymentStatus.notStarted:
//       return (<>
        
//         <div>
          
//           <h1>Thank your submitting your Details </h1>
//           <span>name: { registrationData?.fullName}</span>
//           <h1>Your application id is :{registrationData?.applicationId} </h1>
        
//           <h1>Kindly make payment of Rs. 499 to complete the application</h1>

//         </div>
//        <button 
//         type="button"
//         className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//         onClick={() => {
//             makePayment()
//           }}
//           >
//           Pay
//       </button>
      
//       </>)
//     case PaymentStatus.completed:
//       return (<><div>
//           <h1>Payment Completed</h1>
//              <h1>Thank you for submitting your application</h1>
//                <PdfGeneration data={registrationData!}/>
//            </div></>)
//     case PaymentStatus.fail:
//       return (<>
//         <h1>Payment Failed</h1>
//       </>)
//   }
 
// }

// export default Payment