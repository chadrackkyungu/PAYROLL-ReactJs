/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    IdNumber: Yup.string().nullable().required('ID Number is required'),
    gender: Yup.string().nullable().required('Gender is required'),
    dateOfBirth: Yup.date().nullable().required('Date of birth is required'),
    language: Yup.string().nullable().required('Language is required'),
    phoneNumber: Yup.number().nullable().required('Phone Number is required'),
    materialStatus: Yup.string().nullable().required('Material Status is required'),
    streetAddress: Yup.string().nullable().required('Street Address is required'),
    city: Yup.string().nullable().required('City is required'),
    country: Yup.string().nullable().required('country is required'),
    houseNumber: Yup.number().nullable().required('House number is required'),
    zipCode: Yup.number().nullable().required('Zip Code is required'),
    stateProvince: Yup.string().nullable().required('State or province is required'),
    accountName: Yup.string().nullable().required('Account Name is required'),
    accountType: Yup.string().nullable().required('Account Type is required'),
    branchName: Yup.string().nullable().required('Branch Name is required'),
    accountNumber: Yup.number().nullable().required('Account Number is required'),
    photo: Yup.string().nullable(),
    agreed: Yup.boolean().oneOf([true], "You must accept the terms and conditions")
});

export const initialValues = {
    IdNumber: '65656565',
    gender: 'male',
    dateOfBirth: null,
    language: 'english',
    phoneNumber: '4565656',
    materialStatus: 'married',
    streetAddress: '21 doris street ',
    city: 'Johannesburg',
    country: 'South Africa',
    houseNumber: '0827000150',
    zipCode: '2198',
    stateProvince: 'Gauteng',
    accountName: 'Swazi',
    accountType: 'Saving',
    branchName: 'Bloemfontein',
    accountNumber: '898989898',
};


export const initialValueEmpty = {
    IdNumber: '',
    gender: '',
    dateOfBirth: null,
    language: '',
    phoneNumber: '',
    materialStatus: '',
    streetAddress: '',
    city: '',
    country: '',
    houseNumber: '',
    zipCode: '',
    stateProvince: '',
    accountName: '',
    accountType: '',
    branchName: '',
    accountNumber: '',
};

