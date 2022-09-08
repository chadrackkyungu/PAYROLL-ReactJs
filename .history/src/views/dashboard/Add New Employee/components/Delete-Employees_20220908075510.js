// /* eslint-disable no-underscore-dangle */
// /* eslint-disable prettier/prettier */
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Button } from 'react-bootstrap';
// import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";


// function DeleteEmployees({ details }) {

//     const { currentUser } = useSelector((state) => state.auth);
//     const token = currentUser?.token;

//     const deleteFunc = async () => {
//         const myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${token}`);
//         const raw = "";
//         const requestOptions = {
//             method: 'DELETE',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };
//         fetch(`http://localhost:5000/api/v1/users/${details[0]._id}`, requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 console.log("delete employee", result);
//                 // if (result.status === "success") {
//                 //     successSubmitLeave(`Successfully deleted the employee!!`)
//                 // }
//                 if (result.status === "fail") {
//                     warningMessage(`This employee does not exist anymore`)
//                 }
//             })
//             .catch(err => warningMessage(` 🤒 ${err.response}`));
//     }

//     return (
//         <div>
//             <Button variant="danger" onClick={deleteFunc}>Yes</Button>
//         </div>
//     )
// }

// export default DeleteEmployees