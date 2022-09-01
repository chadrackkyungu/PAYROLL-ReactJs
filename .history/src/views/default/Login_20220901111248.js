/* eslint-disable no-alert */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { useDispatch } from "react-redux"
import { setCurrentUser } from "./../../auth/authSlice"

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loginError, setLoginError] = useState();
  const title = 'Login';
  const description = 'Login Page';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(4, 'Must be at least 6 chars!').required('Password is required'),
  });

  const initialValues = { email: '', password: '' };

  // const myHeaders = new Headers();
  // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTA0NmI4NjMwNmI5N2M4ZjM2ZGJjNyIsImlhdCI6MTY2MjAxNjQzOSwiZXhwIjoxNjY5NzkyNDM5fQ.0x4PuGV-MwKjah4Sd8bJhveJEJHAQXEJWidFlYb1M5A");
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTA0NmI4NjMwNmI5N2M4ZjM2ZGJjNyIsImlhdCI6MTY2MjAxNjcxMiwiZXhwIjoxNjY5NzkyNzEyfQ.LA47P0tieCabT4WwfSYf4JUppTtX1pqYD6tQWAjmXF4");

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/users/login',
        data: { email, password },
      });
      if (res.data.status === 'success') {
        dispatch(setCurrentUser(res.data))
        alert("Successfully logged in")
        history.push('/')
      }
      if (res.data.status === 'fail') {
        alert("Successfully logged in")
      }
    } catch (err) {
      alert('Result', err.response.data.message);
      setLoginError(err.response.data.message)
    }

    // const raw = JSON.stringify({ "email": email, "password": password, });

    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("http://localhost:5000/api/v1/users/login", requestOptions)
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <img src="/img/new-img/login.svg" alt="logo" />
            <h1 className="display-1 text-white mt-4"> Move from papers to digitals </h1>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/" className="logo">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-white bg-success">{loginError}</h2>
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
              Login
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
