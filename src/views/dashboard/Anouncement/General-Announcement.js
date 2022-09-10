/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';

const Profile = () => {
    const title = 'Announcement';
    const description = 'This is an Announcement page';
    const breadcrumbs = [{ to: '', text: 'General Announcement' }];
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
                        {/* <ProfileForm /> */}
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Profile;
