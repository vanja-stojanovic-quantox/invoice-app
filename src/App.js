import './App.css';
import InvoiceList from './InvoiceList';
import Invoice from './Invoice';
import {InvoicesContext} from './InvoicesContext';
import data from './data.json';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import iconLogo from './assets/images/logo.svg';
import iconMoon from './assets/images/icon-moon.svg';
import iconSun from './assets/images/icon-sun.svg';
import avatarIcon from './assets/images/image-avatar.jpg';
import {useState} from 'react';

function App() {
    const invoices = localStorage.getItem('invoiceList')
        ? JSON.parse(localStorage.getItem('invoiceList'))
        : data;
    localStorage.setItem('invoiceList', JSON.stringify(invoices));

    const [theme, setTheme] = useState('');
    const [themeImage, setThemeImage] = useState(iconMoon);
    const [iconClass, setIconClass] = useState('icon-moon');

    let setDarkTheme = true;

    function changeTheme() {
        if (setDarkTheme) {
            setDarkTheme = false;

            setTheme('dark-theme');
            setThemeImage(iconSun);
            setIconClass('icon-sun');
        } else {
            setDarkTheme = true;

            setTheme('light-theme');
            setThemeImage(iconMoon);
            setIconClass('icon-moon');
        }
    }

    return (
        <>
            <div className="header">
                <div className="logo">
                    <img className="icon-logo" src={iconLogo} alt="" />
                    <div className="logo-bottom"></div>
                </div>
                <div className="header-middle">
                    <img
                        className={iconClass}
                        onClick={changeTheme}
                        src={themeImage}
                        alt=""
                    />
                </div>
                <img className="avatar-icon" src={avatarIcon} alt="" />
            </div>
            <div className="header-desktop">
                <div className="logo-desktop">
                    <img className="icon-logo-desktop" src={iconLogo} alt="" />
                    <div className="logo-bottom-desktop"></div>
                </div>
                <div className="header-middle-desktop">
                    <img
                        className={iconClass + '-desktop'}
                        //onClick={changeTheme}
                        src={themeImage}
                        alt=""
                    />
                </div>
                <img className="avatar-icon-desktop" src={avatarIcon} alt="" />
            </div>
            <div id="page" className={'page ' + theme}>
                <Router>
                    <InvoicesContext.Provider value={invoices}>
                        <Routes>
                            <Route path="/" element={<InvoiceList />} />
                            <Route
                                path="/invoices/:invoiceId"
                                element={<Invoice />}
                            />
                        </Routes>
                    </InvoicesContext.Provider>
                </Router>
            </div>
        </>
    );
}

export default App;
