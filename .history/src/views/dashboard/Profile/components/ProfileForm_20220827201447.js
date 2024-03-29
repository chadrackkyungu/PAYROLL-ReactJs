/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AccountSettings = () => {

    const refFileUpload = useRef(null);
    const [thumb, setThumb] = useState('/img/profile/profile-1.webp');

    const onThumbChangeClick = () => {
        if (refFileUpload) {
            refFileUpload.current.dispatchEvent(new MouseEvent('click'));
        }
    };
    const changeThumb = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setThumb(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ];
    const [genderValue, setGenderValue] = useState(genderOptions[1]);

    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Français', label: 'Français' },
    ];
    const [languageValue, setLanguageValue] = useState(languageOptions[1]);

    return (
        <>
            <Col>
                <h2 className="small-title">My Profile</h2>
                <Card className="mb-5">
                    <Card.Body>
                        <Form className="d-flex flex-column">

                            <div className="mb-3 mx-auto position-relative" id="imageUpload">
                                <img src={thumb} alt="user" className="rounded-xl border border-separator-light border-4 sw-11 sh-11" id="contactThumbModal" />
                                <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0"
                                    onClick={onThumbChangeClick}
                                >
                                    <CsLineIcons icon="upload" className="text-alternate" />
                                </Button>

                                <Form.Control type="file" ref={refFileUpload} className="file-upload d-none" accept="image/*" onChange={changeThumb} />
                            </div>

                            <Row>
                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Form.Control type="text" placeholder="Name" defaultValue="Blanch " />
                                    </div>

                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="gender" />
                                        <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={setGenderValue} placeholder="Select" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Form.Control type="text" placeholder="Username" defaultValue="Lwazi" />
                                    </div>

                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="phone" />
                                        <Form.Control type="number" placeholder="Phone" defaultValue="+643452345" />
                                    </div>
                                </Col>
                            </Row>



                            <div className="mb-3 filled">
                                <CsLineIcons icon="email" />
                                <Form.Control type="email" placeholder="Email" defaultValue="lisajackson@gmail.com" />
                            </div>





                        </Form>
                        <Button variant="primary">Update</Button>
                    </Card.Body>
                </Card>
                {/* Public Info End */}
            </Col>
        </>
    );
};

export default AccountSettings;
