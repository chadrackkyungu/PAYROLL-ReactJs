/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Badge, Card, Container, CardBody } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import { MDBDataTable } from "mdbreact"
import { CSVLink, CSVDownload } from "react-csv";
import Cards from "./components/Cards"


const MyLeaves = () => {
    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link to="/employee/private" variant="primary">
                                Private Notification <Badge bg="primary"> <MdNotificationsActive size={18} /> 3</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Link>
                        </div>
                        <Cards />


                        <div>
                            <Container fluid>
                                <Row className="d-flex justify-content-around align-items-center">
                                    <div data-aos="fade-bottom">
                                        <Card className="bd-rds">
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    <Link to="/add-invoice" className="btn report-primary text-white waves-effect waves-light mb-4" type="submit"> Add new invoice  </Link>

                                                    <CSVLink data=";" separator=";" className="text-white"> Download in Excel </CSVLink>
                                                </div>
                                                <MDBDataTable entries={5} entriesOptions={[5, 10, 50]} responsive bordered striped hover data=";" fullPagination />
                                            </div>
                                        </Card>
                                    </div>
                                </Row>
                            </Container>
                        </div>

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default MyLeaves;




