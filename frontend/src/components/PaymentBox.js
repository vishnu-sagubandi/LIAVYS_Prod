import {React,useState} from 'react'
import  DropIn from 'braintree-web-drop-in-react'

function PaymentBox(clientToken) {

    const [instance,setInstance]=useState({})
    return (
        <div>
            <DropIn
                options={{ authorization: clientToken }}
                onInstance={(instance) => setInstance(instance)}
            ></DropIn>
        </div>
    )
}

export default PaymentBox
