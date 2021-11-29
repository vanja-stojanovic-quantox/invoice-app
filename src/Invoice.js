import React, {useContext, useEffect, useState} from 'react';
import {InvoicesContext} from './InvoicesContext';
import {useParams, useNavigate} from 'react-router-dom';
import iconArrowLeft from './assets/images/icon-arrow-left.svg';

const Invoice = () => {
    const invoices = useContext(InvoicesContext);
    const {invoiceId} = useParams();
    const [invoice, setInvoice] = useState(
        invoices.find((inv) => inv.id === invoiceId),
    );

    const navigate = useNavigate();

    function goBack() {
        navigate('/');
    }

    function deleteInvoice() {
        const index = invoices.indexOf(invoice);
        invoices.splice(index, 1);
        localStorage.setItem('invoiceList', JSON.stringify(invoices));

        goBack();
    }

    function payInvoice() {
        if (invoice.status === 'paid') {
            return;
        }

        const tmpInv = invoice;
        tmpInv.status = 'paid';

        setInvoice({...invoice, status: 'paid'});
        const index = invoices.indexOf(invoice);
        invoices[index].status = 'paid';
        localStorage.setItem('invoiceList', JSON.stringify(invoices));
    }

    return (
        <>
            <div className="all-content light-theme">
                <div className="container-back" onClick={goBack}>
                    <img
                        className="icon-arrow-left"
                        src={iconArrowLeft}
                        alt=""
                    />{' '}
                    <span className="text bold dark go-back-text">Go back</span>
                </div>
                <div className="container-status">
                    <div className="container-status-inner">
                        <span className="text status-text">Status</span>
                        <div
                            className={
                                'status position-right ' + invoice.status
                            }>
                            <span className="circle"></span>
                            <span className={'text bold ' + invoice.status}>
                                {invoice.status}
                            </span>
                        </div>
                    </div>
                    <div className="position-right tablet">
                        <button className="text bold btn-edit">Edit</button>
                        <button
                            className="text bold btn-delete"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal">
                            Delete
                        </button>
                        <button
                            className="text bold btn-mark"
                            onClick={payInvoice}>
                            Mark as Paid
                        </button>
                    </div>
                </div>
                <div className="container-invoice-data">
                    <div className="container-invoice-data-top">
                        <div className="container-invoice-data-top-inner">
                            <p className="text color-blue">
                                <span>#</span>
                                <span className="bold dark">{invoiceId}</span>
                            </p>
                            <span className="text color-blue">
                                {invoice.description}
                            </span>
                        </div>
                        <div className="address">
                            <span className="text-information">
                                {invoice.senderAddress.street}
                            </span>
                            <span className="text-information">
                                {invoice.senderAddress.city}
                            </span>
                            <span className="text-information">
                                {invoice.senderAddress.postCode}
                            </span>
                            <span className="text-information">
                                {invoice.senderAddress.country}
                            </span>
                        </div>
                    </div>
                    <div className="date">
                        <p className="text color-blue">Invoice Date</p>
                        <p className="text-date pt-10 pb-22">
                            {invoice.createdAt}
                        </p>
                        <p className="text color-blue">Payment Due</p>
                        <p className="text-date pt-10">{invoice.paymentDue}</p>
                    </div>
                    <div className="user-data">
                        <span className="text color-blue">Bill To</span>
                        <span className="text-date pt-10 pb-8">
                            {invoice.clientName}
                        </span>
                        <span className="text-information">
                            {invoice.clientAddress.street}
                        </span>
                        <span className="text-information">
                            {invoice.clientAddress.city}
                        </span>
                        <span className="text-information">
                            {invoice.clientAddress.postCode}
                        </span>
                        <span className="text-information">
                            {invoice.clientAddress.country}
                        </span>
                    </div>
                    <div className="email">
                        <span className="text color-blue">Sent to</span>
                        <span className="text-date pt-10">
                            {invoice.clientEmail}
                        </span>
                    </div>
                    <div className="payment-cart">
                        <div className="mobile">
                            {invoice.items.map((item) => (
                                <>
                                    <div
                                        key={item.name}
                                        className="payment-cart-inner">
                                        <div className="payment-cart-info">
                                            <p className="text bold dark pb-8">
                                                {item.name}
                                            </p>
                                            <p className="text bold color-blue">
                                                {item.quantity} x £ {item.price}
                                            </p>
                                        </div>
                                        <p className="text bold dark position-right pt-10">
                                            £ {item.total}
                                        </p>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="tablet">
                            <div className="payment-cart-information">
                                <p className="text color-blue pb-32">
                                    Item Name
                                </p>
                                {invoice.items.map((item) => (
                                    <p
                                        key={item.name}
                                        className="text bold dark pb-32">
                                        {item.name}
                                    </p>
                                ))}
                            </div>
                            <div className="payment-cart-quantity">
                                <p className="text color-blue pb-32">QTY.</p>
                                {invoice.items.map((item) => (
                                    <p
                                        key={item.id}
                                        className="text bold dark pb-32">
                                        {item.quantity}
                                    </p>
                                ))}
                            </div>
                            <div className="payment-cart-price">
                                <p className="text color-blue pb-32">Price</p>
                                {invoice.items.map((item) => (
                                    <p
                                        key={item.id}
                                        className="text bold dark pb-32">
                                        £ {item.price}
                                    </p>
                                ))}
                            </div>
                            <div className="payment-cart-total">
                                <p className="text color-blue pb-32">Total</p>
                                {invoice.items.map((item) => (
                                    <p
                                        key={item.id}
                                        className="text bold dark pb-32">
                                        £ {item.total}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="payment-cart-footer">
                        <span className="text-information color-white grand-total">
                            Amount Due
                        </span>
                        <span className="text-fs-20 position-right">
                            £ {invoice.total}
                        </span>
                    </div>
                </div>
                <footer className="mobile">
                    <button className="text bold btn-edit">Edit</button>
                    <button
                        className="text bold btn-delete"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                        Delete
                    </button>
                    <button className="text bold btn-mark" onClick={payInvoice}>
                        Mark as Paid
                    </button>
                </footer>
            </div>
            <div
                className="modal fade"
                id="deleteModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title color-header"
                                id="staticBackdropLabel">
                                Confirm Delection
                            </h5>
                        </div>
                        <div className="modal-body">
                            <p className="text">
                                Are you sure you want to delete invoice{' '}
                                {invoiceId}? This action cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-cancel"
                                data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-del-inv"
                                data-bs-dismiss="modal"
                                onClick={deleteInvoice}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invoice;
