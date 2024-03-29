/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { useSelector } from 'react-redux';
import Individual from "./components/Individual"

const EmployeeAnnouncement = () => {
    const title = 'Employee Announcement';
    const description = 'This is announcement is for a specific employee';
    const breadcrumbs = [{ to: '', text: 'Employee Announcement' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });


    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [announcement, setAnnouncement] = useState();

    const getNotification = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://payroll.up.railway.app/api/v1/announcements", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    setAnnouncement(result.data.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getNotification();
    }, []);

    const indiviualAnnouncement = announcement?.filter(a => {
        return a.user
    })

    if (announcement === undefined) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (announcement.length === 0) {
        return (
            <div className="d-flex justify-content-center">
                <h1 className="text-danger"> You do not have any announcement yet </h1>
            </div>
        )
    }



    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        <Individual announcement={indiviualAnnouncement} />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default EmployeeAnnouncement;
