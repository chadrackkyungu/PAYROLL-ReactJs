/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, } from 'react-redux';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import * as Yup from 'yup';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

const UpdateUserPassword = () => {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    // const initialValues = initialValueEmpty
    // const validationSchema = validationSchema2

    const validationSchema = Yup.object().shape({
        IdNumber: Yup.string().nullable().required('ID Number is required'),
        gender: Yup.string().nullable().required('Gender is required'),
        password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    })

    const initialValues = { passwordCurrent: '', password: '', passwordConfirm: '' }

    const onSubmit = async (values) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "passwordCurrent": values.passwordCurrent,
            "password": values.password,
            "passwordConfirm": values.passwordConfirm,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/users/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`Successfully Added the employee!!`)
                }
                if (result.status === "error") {
                    warningMessage(`This employee exist already in the system!!. try to add another employee`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`));
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;


    return (
        <div className="wizard wizard-default">
            <h5 className="mb-2  text-primary py-4 text-center mt-5"> <b> Update Password Only  </b> </h5>
            <Form onSubmit={handleSubmit} className="d-flex flex-column tooltip-end-top">
                <div className="mb-3 filled">
                    <CsLineIcons icon="eye" />
                    <Form.Control type="password" placeholder="Enter the current password" name="passwordCurrent" value={values.passwordCurrent} onChange={handleChange} />
                    {errors.passwordCurrent && touched.passwordCurrent && <div className="error">{errors.passwordCurrent}</div>}
                </div>
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
