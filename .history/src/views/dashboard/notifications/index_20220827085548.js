/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link } from "react-router-dom";
import { Person } from "../../APIs/Notifications";

const Notifications = () => {

    console.log(Person);

    const title = 'notifications';
    const description = 'This is a notification page';
    const breadcrumbs = [{ to: '', text: 'Home' }];
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
                        {
                            Person.map((details, i) =>
                                <Card className="mb-5 p-3" key={i}>
                                    <Row>
                                        <Col md={10}>
                                            <Row>
                                                <Col md={2}>
                                                    <div className="notification-img">
                                                        <div className="sw-10 me-1 mb-1 d-inline-block">
                                                            <img src="/img/profile/profile-8.webp" className="img-fluid rounded-md" alt="thumb" />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={10}>
                                                    <h4>  Blanch   </h4>
                                                    <div className="notfications">
                                                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione velit expedita animi ab omnis impedit praesentium, tempore minima laborum quam, necessitatibus, perferendis sunt ea accusamus enim quidem non eos! Iste? </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={2}>
                                            <b> 2022-08-27 </b>
                                            <p className="mt-4"> <Link to="#/"> <IoIosArrowDroprightCircle size={24} />  </Link> </p>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        }

                    </section>
                </Col>
            </Row >
        </>
    );
};

export default Notifications;
