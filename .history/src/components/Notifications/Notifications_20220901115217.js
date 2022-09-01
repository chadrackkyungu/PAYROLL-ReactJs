/* eslint-disable prettier/prettier */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const warningMessage = (message) => {
    toast.warning(message, { position: toast.POSITION.BOTTOM_CENTER });
}
export const successMessage = (message) => {
    toast.warning(message, { position: toast.POSITION.TOP_LEFT });
}