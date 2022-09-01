/* eslint-disable prettier/prettier */
import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message) => {
    toast(message, { position: toast.POSITION.BOTTOM_CENTER });
}