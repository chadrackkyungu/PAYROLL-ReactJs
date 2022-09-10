/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import { useSelector } from 'react-redux';
import General from "./components/General"

const GeneralAnnouncement = () => {
    const title = 'Announcement';
    const description = 'This is an Announcement page';
    const breadcrumbs = [{ to: '', text: 'General Announcement' }];
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

        fetch("http://localhost:5000/api/v1/announcements", requestOptions)
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

    if (announcement === undefined) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }


    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link to="/admin/individual-announcement" variant="primary">
                                Individual Announcement <Badge bg="primary"> <MdNotificationsActive size={18} /> </Badge>
                            </Link>
                        </div>
                        <General announcement={announcement} />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default GeneralAnnouncement;
