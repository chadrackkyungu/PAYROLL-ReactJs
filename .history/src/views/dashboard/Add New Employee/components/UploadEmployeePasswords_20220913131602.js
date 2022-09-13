/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import * as Yup from 'yup';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

const UpdateUserPassword = () => {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const validationSchema = Yup.object().shape({
        // password: Yup.string().required('No password provided.').min(4, 'Password is too short - should be 4 chars minimum.')
        //     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        // passwordConfirm: Yup.string().required('No password provided.').min(4, 'Password is too short - should be 4 chars minimum.')
        //     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        password: Yup.string().required('No password provided.'),
        passwordConfirm: Yup.string().required('No password provided.')
    })

    const initialValues = { password: '', passwordConfirm: '' }

    const onSubmit = async (values) => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "password": values.password,
            "passwordConfirm": values.passwordConfirm,
        });

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://polar-basin-47052.herokuapp.com/api/v1/users/resetPassword/${token}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`Successfully updated employee password !!`)
                }
                if (result.status === "error") {
                    warningMessage(`This employee exist already in the system!!. try to add another employee`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response}`));
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;


    return (
        <div className="wizard wizard-default">
            <h5 className="mb-2  text-primary py-4 text-center mt-5"> <b> Update Password Only  </b> </h5>
            <Form onSubmit={handleSubmit} className="d-flex flex-column tooltip-end-top">
                <div className="mb-3 filled">
                    <CsLineIcons icon="eye" />
                    <Form.Control type="password" placeholder="Enter the new password" name="password" value={values.password} onChange={handleChange} />
                    {errors.password && touched.password && <div className="error">{errors.password}</div>}
                </div>
                <div className="mb-3 filled">
                    <CsLineIcons icon="eye" />
                    <Form.Control type="password" placeholder="Confirm password" name="passwordConfirm" value={values.passwordConfirm} onChange={handleChange} />
                    {errors.passwordConfirm && touched.passwordConfirm && <div className="error">{errors.passwordConfirm}</div>}
                </div>

                <Button type="submit" variant="primary" className="btn-icon btn-icon-end mt-2">
                    <span> Update User Password </span>
                </Button>
            </Form>

        </div>
    );
};

export default UpdateUserPassword;
