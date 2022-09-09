/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


function EmployeesDetails({ details }) {

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const images = `http://localhost:5000/img/users/${details[0].photo}`;

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const urlUser = "http://localhost:5000/img/users/"

    return (
        <div>
            <div>
                <div className="card hover-img-scale-up">
                    <img src={`${urlUser}${details[0].photo}`} alt="user" className="card-img sh-25 scale cursor-pointer" onClick={() => openLightbox(2)} />
                </div>
                <Row>
                    <Col md={6}>
                        <h4 className="text-primary mb-5"> Personal Details </h4>
                        <p> Employee Full name : {details[0].firstName} {details[0].lastName} </p>
                        <p> ID Number : {details[0].IdNumber} </p>
                        <p> Phone Number : {details[0].phoneNumber} </p>
                        <p>  Gender : {details[0].gender},  Language : {details[0].language}</p>
                        <p> {details[0].dateOfBirth} </p>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-primary mb-5"> Employee Details </h4>
                        <p> Work Email :  {details[0].email} </p>
                        <p> Role : {details[0].role},  Employee Number : {details[0].employeeNumber} </p>
                        <p> Start Working Date {details[0].startDate} </p>
                    </Col>
                </Row>

            </div>

            <Row>
                <Col md={6}>
                    <h4 className="text-primary mb-5 mt-5"> Address Details </h4>
                    <p>Country : {details[0].country},  City : {details[0].city} </p>
                    <p> Hose Number :  {details[0].houseNumber} , Zip Code : {details[0].zipCode} </p>
                    <p> Material Status : {details[0].materialStatus} </p>
                    <p> Address : {details[0].streetAddress} </p>
                    <p> State or Province :  {details[0].stateProvince} </p>
                </Col>
                <Col md={6}>
                    <h4 className="text-primary mb-5 mt-5"> Employee Account Details </h4>
                    <p> Account Name : {details[0].accountName} </p>
                    <p> Account Number :  {details[0].accountNumber} </p>
                    <p> Account Type :  {details[0].accountType} </p>
                    <p> Account Branch : {details[0].branchName} </p>
                </Col>
            </Row>


            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    loader={<Spinner animation="border" />}
                    wrapperClassName="rounded-lg"
                />
            )}

        </div>
    )
}

export default EmployeesDetails