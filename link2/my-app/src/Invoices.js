import React from 'react'
import { Link ,Outlet} from 'react-router-dom'
import { getInvoices } from './data'

function Invoices() {
    let Invoices=getInvoices()
    return (
       <div style={{display:"flex"}}>
        <nav style={{
            borderRight:"solid 1px",
            padding:"1rem",
        }}>
            {Invoices.map((invoice)=>(
                <Link 
                style={{display:"block",margin:"1rem 0"}}
                to={`/invoices/${invoice.number}`}
                key={invoice.number}>
                    {invoice.name}
                    </Link>
            ))}
        </nav>
        <Outlet/>
       </div>
    )
}

export default Invoices
