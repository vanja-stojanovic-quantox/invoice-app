import React, { useContext, useState } from 'react'
import { InvoicesContext } from "./InvoicesContext";
import { useNavigate } from "react-router-dom";

import iconArrow from "./assets/images/icon-arrow-down.svg";
import iconPlus from "./assets/images/icon-plus.svg";
import iconArrowRight from "./assets/images/icon-arrow-right.svg";

const InvoiceList = () => {
    const data = useContext(InvoicesContext);
    const [ invoices ] = useState(data);

    const navigate = useNavigate();

    function redirectToInvoice(id) {
        navigate("/invoices/" + id);
    }

    return (
    <>
        <div className="all-content light-theme">
            <div className="container-top">
                <div className="container-top-left">
                    <h3>Invoices</h3>
                    <p className="text mobile color-grey">{invoices.length} invoices</p>
                    <p className="text tablet color-grey">There are {invoices.length} total invoices</p>
                </div>
                <div className="container-top-middle">
                    <span className="text bold dark mr-12 mobile">Filter</span><span className="text bold dark mr-12 tablet">Filter by status</span><img className="icon-arrow" src={iconArrow} alt="" />
                </div>
                <button className="btn-new">
                    <div className="btn-new-inner"><img className="icon-plus" src={iconPlus} alt="" /></div>
                    <span className="btn-text mobile">New</span><span className="btn-text tablet">New Invoice</span>
                </button>
            </div>
            <div className="container-invoices mobile">
                {invoices.map(invoice => (
                    <div className="invoice" key={invoice.id} onClick={() => redirectToInvoice(invoice.id)}>
                        <p className="invoice-top text"><span>#</span><span className="bold dark">{invoice.id}</span><span className="position-right color-grey-neutral">{invoice.clientName}</span></p>
                        <div className="data">
                            <p className="text">Due {invoice.paymentDue}</p> 
                            <p className="price">£ {parseFloat(invoice.total).toFixed(2)}</p>
                        </div>
                        <div className={"status position-right " + invoice.status}>
                            <span className="circle"></span> 
                            <span className={"text bold " + invoice.status}>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="container-invoices tablet">
                {invoices.map(invoice => (
                    <div className="invoice" key={invoice.id} onClick={() => redirectToInvoice(invoice.id)}>
                        <p className="text invoice-inner">
                            <span className="text">#</span><span className="bold dark">{invoice.id}</span>
                            <span className="ml-28 mr-35">Due {invoice.paymentDue}</span>
                            <span className="color-grey-neutral">{invoice.clientName}</span>
                            <span className="price position">£ {parseFloat(invoice.total).toFixed(2)}</span>
                        </p>
                        <div className={"status mt-16 mr-20 ml-40 " + invoice.status}>
                            <span className="circle"></span> 
                            <span className={"text bold " + invoice.status}>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                        </div>
                        <img className="icon-arrow-right" src={iconArrowRight} alt="" />
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default InvoiceList;
