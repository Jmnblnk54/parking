
import axios from 'axios'
import React, { Component, useEffect } from 'react'
import { STRIPE_PUBLISH_KEY } from "./utils/keys"
export default function HostRoute() {
  // const ste = useStripe()
  const article = { name: 'React POST Request Example', email: "hassanAli@gmail.com" };
  const headers = {
    'Access-Control-Allow-Origin': "http://192.168.0.1:30006",
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  useEffect(() => {
    axios.post("http://192.168.0.117:3006/create-customer", article, { headers }).then(customer => {
      console.log("CUSTOMER", customer.data.id)
    })
  }, [])
  return (
    <div>

    </div>
  )
}
