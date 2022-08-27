import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';

const Payslip = () => {
    const title = 'Payslip';
    const description = 'This is a payslip page';
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
                        <Card className="mb-5" body>
                            <p> Payslip </p>
                        </Card>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Payslip;
