/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Badge, Card, Modal, Button } from 'react-bootstrap';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Scrollspy from 'components/scrollspy/Scrollspy';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import { MDBDataTable } from "mdbreact"
import { CSVLink, CSVDownload } from "react-csv";
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Cards from "./components/Cards"


const MyLeaves = () => {
    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [rightModalExample, setRightModalExample] = useState(false);
    const [largeRightModalExample, setLargeRightModalExample] = useState(false);
    const [rightModalScrollExample, setRightModalScrollExample] = useState(false);

    const [dataDb, setData] = useState([
        {
            type: 'Sick',
            start_date: "2022-07-14",
            end_date: "2022-07-14",
            view: <Badge bg="success"> <Link to="#/" className="text-white"> <CsLineIcons icon="eye" size={10} className="text-white" /> view </Link>  </Badge>,
            status: <Badge bg="success">  Approved   </Badge>,
            edit: <Badge pill bg="primary">  <Link to="#/" className="text-white"> <CsLineIcons icon="pen" size={10} className="text-white" /> Edit </Link> </Badge>,
        },
        {
            type: 'Vacation',
            start_date: "2022-07-14",
            end_date: "2022-07-14",
            view: <Badge bg="success"> <Link to="#/" className="text-white"> <CsLineIcons icon="eye" size={10} className="text-white" /> view </Link>  </Badge>,
            status: <Badge bg="danger">  Decline   </Badge>,
            edit: <Badge pill bg="primary">  <Link to="#/" className="text-white"> <CsLineIcons icon="pen" size={10} className="text-white" /> Edit </Link> </Badge>,

        },
        {
            type: 'Break',
            start_date: "2022-07-14",
            end_date: "2022-07-14",
            view: <Badge bg="success"> <Link to="#/" className="text-white"> <CsLineIcons icon="eye" size={10} className="text-white" /> view </Link>  </Badge>,
            status: <Badge bg="warning">  Pending   </Badge>,
            edit: <Badge pill bg="primary" onClick={() => setRightModalExample(true)}>  <Link to="#/" className="text-white">
                <CsLineIcons icon="pen" size={10} className="text-white" /> Edit </Link> </Badge>,

        },
    ]);


    const column = [
        { label: "Leave Type", field: "type", sort: "asc", width: 150 },
        { label: "Leave Start Date", field: "start_date", sort: "asc", width: 150 },
        { label: "Leave End Date", field: "end_date", sort: "asc", width: 150 },
        { label: "Status", field: "status", sort: "asc", width: 150 },
        { label: "Actions", field: "view", sort: "asc", width: 150 },
        { label: "Actions", field: "edit", sort: "asc", width: 150 }
    ];

    const data = {
        columns: column,
        rows: dataDb,
    }

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

                        <Card className="mt-5 px-5">
                            <div className="d-flex justify-content-between">
                                <CSVLink data={dataDb} separator={";"} className="text-white"> Download in Excel </CSVLink>
                            </div>
                            <MDBDataTable entries={5} entriesOptions={[5, 10, 50]} responsive bordered striped hover data={data} fullPagination />
                        </Card>

                    </section>
                </Col>
            </Row>

            <section className="scroll-section" id="rightModal">
                <h2 className="small-title">Right Modal</h2>
                <Card body className="mb-5">
                    <Button variant="outline-primary" onClick={() => setRightModalExample(true)}>Standard</Button>
                    <Modal className="modal-right" show={rightModalExample} onHide={() => setRightModalExample(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>...</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setRightModalExample(false)}>
                                Close
                            </Button>
                            <Button onClick={() => setRightModalExample(false)}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            </section>

        </>
    );
};

export default MyLeaves;




