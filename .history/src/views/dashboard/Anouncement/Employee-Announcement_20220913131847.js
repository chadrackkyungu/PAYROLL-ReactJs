/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
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

        fetch("https://polar-basin-47052.herokuapp.com/api/v1/announcements", requestOptions)
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
