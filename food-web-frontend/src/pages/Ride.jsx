import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import OrderForm from '../components/UI/common-section/OrderForm.tsx';
const Ride = () => {

  return (
    <Helmet title='Ride services'>
      <CommonSection title='Ride services' />
      <section>
        <Container>
          <Row>
            <Col>

             {/* Order Form */}
             <OrderForm lat={7} long={0}></OrderForm>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Ride;
