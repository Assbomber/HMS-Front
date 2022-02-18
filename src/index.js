import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./Pages/Login";
import Error from "./Components/Error";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Loader from "./Components/Loader";
import PatientHome from "./Pages/PatientHome";
import StaffHome from "./Pages/StaffHome";
import {Provider} from "react-redux";
import store from "./Redux/store";
import Otp from "./Components/Otp"
import NewPatient from "./Components/NewPatient"
import AppointmentCard from "./Components/AppointmentCard"
import DatePicker from 'react-date-picker';
import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {Redirect} from "react-router-dom";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
     // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    detection:{
      order: ['localStorage','cookie','htmlTag', 'path', 'subdomain'],
      caches:['localStorage','cookie']
    },
    backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react:{
      useSuspense:false,
    }

    // interpolation: {
    //   escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    // }
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/staff">
          <StaffHome/>
        </Route>
        <Route path="/patient">
          <PatientHome/>
        </Route>
        <Route path="/test">
        <DatePicker />
        </Route>
      </Switch>
    </Router>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
