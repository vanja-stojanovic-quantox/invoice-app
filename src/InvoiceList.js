import React, {useContext, useEffect, useState} from 'react';
import {InvoicesContext} from './InvoicesContext';
import {useNavigate} from 'react-router-dom';

import iconArrow from './assets/images/icon-arrow-down.svg';
import iconPlus from './assets/images/icon-plus.svg';
import iconArrowRight from './assets/images/icon-arrow-right.svg';
import illustrationImage from './assets/images/illustration-empty.svg';
import iconArrowLeft from './assets/images/icon-arrow-left.svg';

const InvoiceList = () => {
    const data = useContext(InvoicesContext);
    const [invoices, setInvoices] = useState(data);
    const [filterStatusList, setFilter] = useState([]);
    const [displayFilter, showFilter] = useState('');

    const navigate = useNavigate();

    function redirectToInvoice(id) {
        navigate(`/invoices/${id}`);
    }

    function filterInvoices(status) {
        if (filterStatusList.includes(status)) {
            const index = filterStatusList.indexOf(status);
            setFilter(filterStatusList.filter((s) => s != status));
        } else {
            setFilter([...filterStatusList, status]);
        }
    }

    function toggleFilter() {
        if (displayFilter === 'show') {
            showFilter('');
        } else {
            showFilter('show');
        }
    }

    useEffect(() => {
        if (filterStatusList.length === 0) {
            setInvoices(data);
        } else {
            setInvoices(
                data.filter((inv) => filterStatusList.includes(inv.status)),
            );
        }
    }, [filterStatusList]);

    return (
        <>
            <div className="all-content light-theme">
                <div className="container-top">
                    <div className="container-top-left">
                        <h3>Invoices</h3>
                        <p className="text mobile color-grey">
                            {invoices.length} invoices
                        </p>
                        <p className="text tablet color-grey">
                            There are {invoices.length} total invoices
                        </p>
                    </div>
                    <div
                        className="container-top-middle"
                        onClick={toggleFilter}>
                        <span className="text bold dark mr-12 mobile">
                            Filter
                        </span>
                        <span className="text bold dark mr-12 tablet">
                            Filter by status
                        </span>
                        <img className="icon-arrow" src={iconArrow} alt="" />
                    </div>
                    <button
                        className="btn-new"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                        <div className="btn-new-inner">
                            <img className="icon-plus" src={iconPlus} alt="" />
                        </div>
                        <span className="btn-text mobile">New</span>
                        <span className="btn-text tablet">New Invoice</span>
                    </button>
                </div>
                <div className={'container-filter ' + displayFilter}>
                    <div className="filter-option">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            onClick={() => filterInvoices('draft')}
                        />
                        <span className="text bold">Draft</span>
                    </div>
                    <div className="filter-option">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            onClick={() => filterInvoices('pending')}
                        />
                        <span className="text bold">Pending</span>
                    </div>
                    <div className="filter-option">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            onClick={() => filterInvoices('paid')}
                        />
                        <span className="text bold">Paid</span>
                    </div>
                </div>
                {invoices.length === 0 && (
                    <>
                        <div className="container-image-illustration">
                            <img
                                className="image-illustration"
                                src={illustrationImage}
                                alt=""
                            />
                            <div className="container-image-bottom ">
                                <h3 className="bold">There is nothing here</h3>
                                <p className="text pt-24 pl-pr-8 mobile">
                                    Create an invoice by clicking the{' '}
                                    <span className="bold">New</span> button and
                                    get started{' '}
                                </p>
                                <p className="text pt-24 tablet hidden-desktop">
                                    {' '}
                                    Create a new invoice by clicking the{' '}
                                    <span className="bold">New Invoice </span>
                                    button and get started
                                </p>
                                <p className="text pt-24 desktop">
                                    Create on invoice by clicking the{' '}
                                    <span className="bold">New Invoice </span>
                                    button and get started
                                </p>
                            </div>
                        </div>
                    </>
                )}
                <div className="container-invoices mobile">
                    {invoices.map((invoice) => (
                        <div
                            className="invoice"
                            key={invoice.id}
                            onClick={() => redirectToInvoice(invoice.id)}>
                            <p className="invoice-top text">
                                <span>#</span>
                                <span className="bold dark">{invoice.id}</span>
                                <span className="position-right color-grey-neutral">
                                    {invoice.clientName}
                                </span>
                            </p>
                            <div className="data">
                                <p className="text">Due {invoice.paymentDue}</p>
                                <p className="price">
                                    £ {parseFloat(invoice.total).toFixed(2)}
                                </p>
                            </div>
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
                    ))}
                </div>
                <div className="container-invoices tablet">
                    {invoices.map((invoice) => (
                        <div
                            className="invoice"
                            key={invoice.id}
                            onClick={() => redirectToInvoice(invoice.id)}>
                            <p className="text invoice-inner">
                                <span className="text">#</span>
                                <span className="bold dark">{invoice.id}</span>
                                <span className="ml-28 mr-35">
                                    Due {invoice.paymentDue}
                                </span>
                                <span className="color-grey-neutral">
                                    {invoice.clientName}
                                </span>
                                <span className="price position">
                                    £ {parseFloat(invoice.total).toFixed(2)}
                                </span>
                            </p>
                            <div
                                className={
                                    'status mt-16 mr-20 ml-40 ' + invoice.status
                                }>
                                <span className="circle"></span>
                                <span className={'text bold ' + invoice.status}>
                                    {invoice.status}
                                </span>
                            </div>
                            <img
                                className="icon-arrow-right"
                                src={iconArrowRight}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="container-back" data-bs-dismiss="modal">
                            <img
                                className="icon-arrow-left"
                                src={iconArrowLeft}
                                alt=""
                            />{' '}
                            <span className="text bold dark go-back-text">
                                Go back
                            </span>
                        </div>
                        <h3 className="bold">New Invoice</h3>
                        <div className="modal-body">
                            <span className="text bold color-purple">
                                Bill From
                            </span>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Street Address
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <div className="modal-container-small mr-23">
                                    <span className="text text-modal">
                                        City
                                    </span>
                                    <div className="input-group input-group-sm">
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-sm"
                                        />
                                    </div>
                                </div>
                                <div className="modal-container-small">
                                    <span className="text text-modal">
                                        Post Code
                                    </span>
                                    <div className="input-group input-group-sm">
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-container pb-40">
                                <span className="text text-modal">Country</span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <span className="text bold color-purple">
                                Bill To
                            </span>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Client's Name
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Client's Email
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Street Address
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <div className="modal-container-small mr-23">
                                    <span className="text text-modal">
                                        City
                                    </span>
                                    <div className="input-group input-group-sm">
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-sm"
                                        />
                                    </div>
                                </div>
                                <div className="modal-container-small">
                                    <span className="text text-modal">
                                        Post Code
                                    </span>
                                    <div className="input-group input-group-sm">
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-container pb-40">
                                <span className="text text-modal">Country</span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Invoice Date
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="date"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Payment Terms
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Project Description
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                            <h2>Item List</h2>
                            <div className="modal-container">
                                <span className="text text-modal">
                                    Item Name
                                </span>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn-discard"
                                data-bs-dismiss="modal">
                                Discard
                            </button>
                            <button className="btn-save-as-draft">
                                Save as Draft
                            </button>
                            <button className="btn-save-send">
                                Save & Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceList;
