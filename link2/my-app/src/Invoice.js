import React from 'react'
import { useParams } from 'react-router'
function Invoice() {
    let parms=useParams()
    return <h2>Invoice:{parms.invoiceId}</h2>
    
}

export default Invoice
