/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import ProfileForm from "./components/ProfileForm"

const Profile = () => {
    const title = 'Profile';
    const description = 'This is a Profile page';
    const breadcrumbs = [{ to: '', text: 'Profile' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        {/* <Card className="mb-5" body> */}
                        <ProfileForm />
                        {/* </Card> */}
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Profile;
