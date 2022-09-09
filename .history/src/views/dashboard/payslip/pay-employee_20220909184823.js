/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import PayEmployee from './components/Pay-employee';

const Payslip = () => {
    const { id } = useParams();
    console.log(id);

    const title = 'Pay';
    const description = 'This is a payment page';
    const breadcrumbs = [{ to: '', text: 'Pay' }];
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
                        <PayEmployee />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Payslip;
