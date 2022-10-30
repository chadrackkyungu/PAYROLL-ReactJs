/* eslint-disable no-alert */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import "./Style.scss";
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { useDispatch } from "react-redux"
import { warningMessage, successMessage } from "../../components/Notifications/Notifications";
import { setCurrentUser } from "./../../auth/authSlice"

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const title = 'Login';
  const description = 'Login Page';
  const [btnLoad, setBtnLoad] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(4, 'Must be at least 4 chars!').required('Password is required'),
  });

  const initialValues = { email: '', password: '' };

  const onSubmit = async (values) => {

    setBtnLoad(true)

    const { email, password } = values;
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://polar-basin-47052.herokuapp.com/api/v1/users/login',
        data: { email, password },
      });
      if (res.data.status === 'success') {
        dispatch(setCurrentUser(res.data))
        successMessage(`Successfully logged in`)

        window.setTimeout(() => {
          history.push('/');
        }, 3000);

        setBtnLoad(false)
      }
    } catch (err) {
      if (err.response.status === 401) {
        setBtnLoad(false)
        warningMessage(` 🤒 Password or email incorrect try again`);
      };
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        {/* <img src="/img/logo/logo-blue-light.svg" alt="logo" />
        <div className="img" /> */}
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        {/* <div className="d-flex justify-content-end logo_container"> */}
        <div className="d-flex logo_container">
          {/* <img src="/img/logo/logo-blue-light.svg" alt="logo" /> */}
          <img src="/img/logo/Logo.jpeg" alt="logo" />
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              {
                !btnLoad ? <span> <CsLineIcons icon="login" /> <span className="me-2">Login </span> </span> : <span>  <Spinner as="span" animation="border" size="sm" /> Loading...</span>
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
