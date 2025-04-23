'use server'
import axios from "axios";
import { auth, clerkClient } from '@clerk/nextjs/server'

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()
  const phoneNo = formData.get('phone')
  const plan = formData.get('plan')  
  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role: "user",
        phone:phoneNo,
        plan
      },
    })
    // const pay = await handlePayment({
    //     phone:phoneNo,
    //     amount:1
    // })
    return { message: res.publicMetadata}
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}



const handlePayment = async ({phone,amount}) => {
  try {    
    const formattedPhone = phone.substring(1)
    
    // M-Pesa API Credentials
    const consumerKey = process.env.MPESA_CONSUMER_KEY!;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;

    // Generate timestamp
    const now = new Date();
    const timeStamp = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    // Encode password
    const password = Buffer.from(shortcode + passkey + timeStamp).toString("base64");
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    // Get OAuth token
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
       headers:{
        authorization:`Basic ${auth}`
       }
      }
    );

    const accessToken = response.data.access_token;

    // STK Push request
    const { data: stkResponse } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${formattedPhone}`,
        PartyB: shortcode,
        PhoneNumber: `254${formattedPhone}`,
        CallBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/`,
        AccountReference: "ArdhiKwanza",
        TransactionDesc: "Payment for services",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log(stkResponse);

    return stkResponse;
  } catch (error) {
    console.log(error.message);
    return error.message
  }
}