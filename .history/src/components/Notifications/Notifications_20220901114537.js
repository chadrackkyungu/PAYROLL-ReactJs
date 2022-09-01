/* eslint-disable prettier/prettier */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message) => {
    toast.warning("🚫", message, { position: toast.POSITION.BOTTOM_CENTER });
}