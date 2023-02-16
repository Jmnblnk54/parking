import axios from "axios"
export const STRIPE_PUBLISH_KEY = "pk_test_51KBVfvL1EKKxPjppwsXmWi2ae2nG5duejEhNvc9zhv85AfvaMbcQQ9wlJ8Y0733Vr4sdr1hcV4EjNBiTXKWyFIgn00rKEZQ6uo";
export const STRIPE_SECRET_KEY = "sk_test_51KBVfvL1EKKxPjppGBkfGWnZ1mQpcwDpIhNYI8L0ZL3X4E9dXx5H09z5tMWDQzkTeRRnclIEbdeqPSUmm6X5Vjc600PAUopYgH";

export function getCustomerId(name, email) {
    const article = { name: name, email: email };
    const headers = {
        'Access-Control-Allow-Origin': "http://192.168.0.1:30006",
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios.post("http://192.168.0.117:3006/create-customer", article, { headers }).then(customer => {
        return customer.data.id
    }).catch(err => { return err })
}