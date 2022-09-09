/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { Link } from 'react-router-dom';

const Payslip = () => {

    const title = 'Successful Payment';
    const description = 'This is a successful payment page';
    const breadcrumbs = [{ to: '', text: 'Successful Payment' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });



    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>

                        <div>
                            <>
                                <img src="" alt="" />
                                <Link to="#/" className='btn btn-primary'> Pay again </Link>
                            </>
                        </div>

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Payslip;
