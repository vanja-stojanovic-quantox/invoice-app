import './App.css';
import InvoiceList from './InvoiceList';
import Invoice from './Invoice';
import { InvoicesContext } from './InvoicesContext';
import data from './data.json';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import iconLogo from "./assets/images/logo.svg";
import iconMoon from "./assets/images/icon-moon.svg";
import avatarIcon from "./assets/images/image-avatar.jpg";


function App() {
  const invoices = localStorage.getItem("invoiceList") ? JSON.parse(localStorage.getItem("invoiceList")) : data;
  localStorage.setItem("invoiceList", JSON.stringify(invoices));

  return (
    <>
    <div className="header">
      <div className="logo">
        <img className="icon-logo" src={iconLogo} alt="" />
        <div className="logo-bottom"></div>
      </div>
      <div className="header-middle">
        <img className="icon-moon" src={iconMoon} alt="" />
      </div>
      <img className="avatar-icon" src={avatarIcon} alt="" />
    </div>
    <div className="header-desktop">
      <div className="logo-desktop">
          <img className="icon-logo-desktop" src={iconLogo} alt="" />
          <div className="logo-bottom-desktop"></div>
      </div>
      <div className="header-middle-desktop">
        <img className="icon-moon-desktop" src={iconMoon} alt="" />
      </div>
      <img className="avatar-icon-desktop" src={avatarIcon} alt="" />
    </div>
    <div className="page">
      <Router>
        <InvoicesContext.Provider value={ invoices }>
          <Routes>
            <Route path="/" element={<InvoiceList/>} />
            <Route path="/invoices/:invoiceId" element={<Invoice/>} />
          </Routes>
        </InvoicesContext.Provider>
      </Router>
    </div>
    
    </>
  );
}

export default App;
