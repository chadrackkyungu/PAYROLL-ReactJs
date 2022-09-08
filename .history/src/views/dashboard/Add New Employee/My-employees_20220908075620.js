/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Badge, Card, Modal, Button } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import EmployeesDetails from './components/Employees-details';
// import DeleteEmployees from './components/Delete-Employees';
import { warningMessage, successSubmitLeave } from "../../../components/Notifications/Notifications";



const Employees = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const title = 'My Employees';
    const description = 'List of all my employees';
    const breadcrumbs = [{ to: '', text: 'My Employees' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [lExample, setLExample] = useState(false);
    const [smExample, setSmExample] = useState(false);
    const [rightModalScrollExample, setRightModalScrollExample] = useState(false);

    const [leaveId, setLeaveId] = useState();
    const [ViewEmployee, setViewEmployee] = useState(false);
    const token = currentUser?.token;
    const [myEmployees, setEmployees] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`http://localhost:5000/api/v1/users`, requestOptions)
                .then(response => response.json())
                .then(result => setEmployees(result.data.data))
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    const employeeDet = myEmployees?.filter(employee => employee._id === ViewEmployee);




    const deleteFunc = async () => {
        const myHeader = new Headers();
        myHeader.append("Authorization", `Bearer ${token}`);

        const raw = "";
        const deleteRequest = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`http://localhost:5000/api/v1/users/${employeeDet[0]._id}`, deleteRequest)
            .then(response => response.json())
            .then(result => {
                console.log("delete employee", result);
                // if (result.status === "success") {
                //     successSubmitLeave(`Successfully deleted the employee!!`)
                // }
                if (result.status === "fail") {
                    warningMessage(`This employee does not exist anymore`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response}`));
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>

                        <Link to="/Admin/add-new-employee"> <button className='btn btn-primary'>   + Add new employee </button>  </Link>

                        <Card className="mt-5">
                            <div className="table-responsive p-4">
                                <table className="table align-middle table-nowrap mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "20px" }}>
                                                <div className="form-check font-size-16 align-middle">
                                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                    <label className="form-check-label" htmlFor="customCheck1"> &nbsp;</label>
                                                </div>
                                            </th>
                                            <th className="align-middle">Empl No</th>
                                            <th className="align-middle">Full Name</th>
                                            {/* <th className="align-middle">phone Number</th> */}
                                            <th className="align-middle">Email</th>
                                            <th className="align-middle">Role</th>
                                            <th className="align-middle">Gender</th>
                                            <th className="align-middle">View</th>
                                            <th className="align-middle">Edit</th>
                                            <th className="align-middle">Pay</th>
                                            <th className="align-middle">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myEmployees?.map((empl, key) => (
                                            <tr key={"_tr_" + key}>
                                                <td>
                                                    <div className="form-check font-size-16">
                                                        <input type="checkbox" className="form-check-input" id={empl?._id} />
                                                        <label className="form-check-label" htmlFor={empl?._id}> &nbsp;</label>
                                                    </div>
                                                </td>
                                                <td>{empl.employeeNumber}</td>
                                                <td>{empl?.firstName} {empl?.lastName}</td>
                                                {/* <td>{empl?.phoneNumber}</td> */}
                                                <td>{empl?.email}</td>
                                                <td> <Badge className="bg-info"> {empl?.role} </Badge> </td>
                                                <td>{empl?.gender}</td>
                                                <td><Badge className='bg-success cursor-pointer'
                                                    onClick={() => {
                                                        setLExample(true)
                                                        setViewEmployee(empl?._id)
                                                    }}> <CsLineIcons icon="eye" size="14" /> View  </Badge></td>

                                                <td className="cursor-pointer"
                                                    onClick={() => {
                                                        setRightModalScrollExample(true)
                                                        setLeaveId(empl._id);
                                                    }}> <Badge> <CsLineIcons icon="pen" size="12" /> Edit </Badge>
                                                </td>

                                                <td>
                                                    <Badge className="cursor-pointer bg-info"> <CsLineIcons icon="dollar" size="14" /> Pay Now</Badge>
                                                </td>
                                                <td>
                                                    <Badge className="bg-danger cursor-pointer"
                                                        onClick={() => {
                                                            setSmExample(true)
                                                            setViewEmployee(empl?._id)
                                                        }}
                                                    >  <CsLineIcons icon="bin" size="14" /> Delete </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </section>
                </Col>
            </Row>

            {/* Modal View Details */}

            <Modal show={lExample} onHide={() => setLExample(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> Employee Details </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EmployeesDetails details={employeeDet} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => setLExample(false)}> Close </Button>
                </Modal.Footer>
            </Modal>




            {/* Modal Update details */}
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



            {/* Delete  Modal  */}
            <Modal show={smExample} onHide={() => setSmExample(false)} size="md">
                <Modal.Header closeButton>
                    <h2 className="text-warning"> Are you sure you wanna delete this employee ? </h2>
                </Modal.Header>

                {/* <Modal.Body>
                    <DeleteEmployees details={employeeDet} cancel={false} />
                </Modal.Body> */}

                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="secondary" onClick={() => setSmExample(false)}> No </Button>
                    <Button variant="danger" onClick={deleteFunc}>Yes</Button>
                </Modal.Footer>
            </Modal>


        </>
    );
};

export default Employees;




