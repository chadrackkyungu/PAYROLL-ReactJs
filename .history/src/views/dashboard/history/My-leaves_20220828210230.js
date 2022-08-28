/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Badge, Card, Modal, Button } from 'react-bootstrap';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
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
            edit: <Badge pill bg="primary">  <Link to="#/" className="text-white"> <CsLineIcons icon="pen" size={10} className="text-white" /> Edit </Link> </Badge>,

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


            {/* Right Modal Start */}
            <section className="scroll-section" id="rightModal">
                <h2 className="small-title">Right Modal</h2>
                <Card body className="mb-5">
                    <Button variant="outline-primary" onClick={() => setRightModalExample(true)}>
                        Standard
                    </Button>{' '}
                    <Button variant="outline-primary" onClick={() => setLargeRightModalExample(true)}>
                        Large
                    </Button>{' '}
                    <Button variant="outline-primary" onClick={() => setRightModalScrollExample(true)}>
                        Scroll
                    </Button>
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
                    <Modal className="modal-right large" show={largeRightModalExample} onHide={() => setLargeRightModalExample(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>...</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setLargeRightModalExample(false)}>
                                Close
                            </Button>
                            <Button onClick={() => setLargeRightModalExample(false)}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        className="modal-right scroll-out-negative"
                        show={rightModalScrollExample}
                        onHide={() => setRightModalScrollExample(false)}
                        scrollable
                        dialogClassName="full"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="scroll-track-visible">
                                <p>
                                    Liquorice caramels apple pie chupa chups bonbon. Jelly-o candy apple pie sugar plum icing chocolate cake lollipop jujubes bear claw.
                                    Pastry sweet roll carrot cake cake macaroon gingerbread cookie. Lemon drops brownie candy cookie candy pie sweet roll biscuit marzipan.
                                    Chocolate bar candy canes macaroon liquorice danish biscuit biscuit. Tiramisu toffee brownie sweet roll sesame snaps halvah. Icing carrot
                                    cake cupcake gummi bears danish. Sesame snaps muffin macaroon tiramisu ice cream jelly-o pudding marzipan tootsie roll. Muffin candy icing
                                    tootsie roll wafer powder danish cheesecake macaroon. Sweet marshmallow oat cake marshmallow ice cream carrot cake. Bonbon powder carrot
                                    cake marzipan jelly beans pie cotton candy cotton candy. Gummies donut caramels chocolate bar. Powder soufflé brownie jelly beans
                                    gingerbread candy.
                                </p>
                                <p>
                                    Apple pie gummies marshmallow wafer. Cookie macaroon croissant tart topping jelly pie sesame snaps jelly. Chocolate tootsie roll
                                    marshmallow tootsie roll gummi bears jelly beans lollipop macaroon gummi bears. Ice cream gingerbread tart cheesecake. Brownie jelly beans
                                    cookie liquorice candy bear claw powder muffin sweet roll. Carrot cake gingerbread pudding chocolate cake cake chocolate bar sesame snaps
                                    wafer. Pie jelly beans tart donut chupa chups caramels sesame snaps wafer gummies. Cake marshmallow cupcake donut. Marshmallow cookie
                                    gummies chocolate cake dragée topping cheesecake halvah carrot cake. Cupcake bear claw carrot cake candy canes bonbon croissant biscuit
                                    liquorice fruitcake. Jelly liquorice gummies. Biscuit croissant croissant liquorice. Gummi bears pie powder fruitcake caramels brownie
                                    danish pastry pudding. Caramels sugar plum cookie cotton candy tootsie roll jelly pudding.
                                </p>
                                <p>
                                    Tiramisu brownie tart chupa chups icing chupa chups. Gummi bears fruitcake carrot cake chocolate bonbon. Sesame snaps brownie gummi bears
                                    tootsie roll caramels dragée. Powder cake gummies jelly beans toffee carrot cake bonbon powder muffin. Marshmallow jelly beans cake donut
                                    cotton candy chocolate bar biscuit macaroon marzipan. Cake cupcake gummies. Gingerbread bonbon wafer. Pastry sweet cookie danish lollipop
                                    sweet toffee topping bear claw. Apple pie dessert cake dessert. Tiramisu pie sugar plum gingerbread cupcake brownie candy canes gummies
                                    jelly. Bonbon chocolate cake lollipop lollipop jelly beans apple pie halvah sweet roll. Macaroon jujubes powder cheesecake sesame snaps
                                    fruitcake marzipan muffin.
                                </p>
                                <p>
                                    Powder icing cotton candy gingerbread cake chocolate bar muffin. Fruitcake bear claw cake chupa chups. Gingerbread dessert chocolate cake
                                    tiramisu macaroon. Gingerbread sweet roll sesame snaps donut danish carrot cake. Muffin chocolate bar jujubes ice cream jujubes. Dessert
                                    tiramisu chocolate bar biscuit. Brownie ice cream marshmallow topping. Icing liquorice oat cake caramels. Sugar plum gummi bears jujubes
                                    cookie jelly-o tootsie roll chocolate bar. Jujubes candy jelly-o topping lemon drops. Cupcake gingerbread cookie cookie lemon drops
                                    tootsie roll lollipop. Carrot cake oat cake jelly-o gummies oat cake cake biscuit carrot cake tart.
                                </p>
                                <p>
                                    Donut chupa chups cake. Chupa chups cake cheesecake dragée fruitcake. Fruitcake tart donut biscuit. Soufflé brownie carrot cake pastry
                                    powder. Powder donut dragée toffee. Chocolate cake chocolate soufflé gummi bears jelly beans ice cream pastry. Fruitcake brownie cupcake
                                    oat cake danish wafer candy cake. Fruitcake chocolate chocolate cake. Marzipan wafer macaroon cookie candy canes fruitcake. Lemon drops
                                    sesame snaps cotton candy marshmallow lemon drops fruitcake dragée brownie. Jelly beans gingerbread sweet roll bonbon. Fruitcake tiramisu
                                    tart apple pie pastry. Sweet roll candy canes pastry.
                                </p>
                            </OverlayScrollbarsComponent>
                        </Modal.Body>
                    </Modal>
                </Card>
            </section>
            {/* Right Modal End */}



        </>
    );
};

export default MyLeaves;




