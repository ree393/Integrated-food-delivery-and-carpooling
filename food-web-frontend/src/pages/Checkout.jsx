import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import '../styles/checkout.css';
import { FirebaseOrderRepo } from '../components/Order/repo/FirebaseEventRepo.ts';
const Checkout = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNumber, setEnteredNumber] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredPostalCode, setEnteredPostalCode] = useState('');
  const [enteredCountry, setEnteredCountry] = useState('');
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const [loader,setLoader]=useState(false) 
  const [isSuccess,setSuccess]=useState(false) 

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 10;
  const totalAmount = cartTotalAmount + shippingCost;

const getCartItem=(p)=>{
const cartItem={
  id: p.id,
  title: p.title,
  price: p.price,
  quantity: p.quantity,
  totalPrice:p.totalPrice
}
return cartItem
}

  const submitHandler = async(e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredNumber,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostalCode,
      country: enteredCountry,
    };

    shippingInfo.push(userShippingAddress);
    // create order Order 
    const order={
      id: '',
      items: cartProducts.map((p)=>getCartItem(p)),
      total: totalAmount,
      user: {
        uid: '',
        userName: userShippingAddress.name,
        email: userShippingAddress.email,
        phone: userShippingAddress.phone
      },
      location: { lat: 0, long: 0 },
      type:'Food',
      shippingAddress:userShippingAddress,
      date:new Date()

    }

    // save 
    const orderRepo =new FirebaseOrderRepo();
    setLoader(true)
    await orderRepo.saveOrder(order);
    console.log(order);
setLoader(false);
setSuccess(true)
  };
  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            
              {!isSuccess ?
            <><Col lg='8' md='6'>
                <h6 className='mb-4'>Shipping Address</h6>
                <form
                  action=''
                  className='checkout__form'
                  onSubmit={submitHandler}
                >
                  <div className='form__group'>
                    <input
                      required
                      type='text'
                      placeholder='Name'
                      onChange={(e) => setEnteredName(e.target.value)} />
                  </div>
                  <div className='form__group'>
                    <input
                      required
                      type='email'
                      placeholder='Email'
                      onChange={(e) => setEnteredEmail(e.target.value)} />
                  </div>
                  <div className='form__group'>
                    <input
                      required
                      type='number'
                      placeholder='Phone number'
                      onChange={(e) => setEnteredNumber(e.target.value)} />
                  </div>
                  <div className='form__group'>
                    <input
                      required
                      type='text'
                      placeholder='Street Address'
                      onChange={(e) => setEnteredAddress(e.target.value)} />
                  </div>
                  <div className='form__group'>
                    <input
                      required
                      type='text'
                      placeholder='City'
                      onChange={(e) => setEnteredCity(e.target.value)} />
                  </div>
                  <div className='form__group'>
                    <input
                      required
                      type='number'
                      placeholder='Postal code'
                      onChange={(e) => setEnteredPostalCode(e.target.value)} />
                  </div>
                  <div className='form__group'>
                    <input
                      required
                      type='text'
                      placeholder='Country'
                      onChange={(e) => setEnteredCountry(e.target.value)} />
                  </div>
                  
                  <button className='addToCart__btn'> {loader ?'Loading..':'Order'}</button>
                </form>
              </Col><Col lg='4' md='6'>
                  <div className='checkout__bill'>
                    <h6 className='d-flex align-items-center justify-content-between mb-3'>
                      Subtotal:<span>₹{cartTotalAmount}</span>
                    </h6>
                    <h6 className='d-flex align-items-center justify-content-between mb-3'>
                      Shipping fee:<span>₹{shippingCost}</span>
                    </h6>
                    <h6 className='d-flex align-items-center justify-content-between mb-3'>
                      Payment Type :<span>COD</span>
                    </h6>
                    <div className='checkout__total'>
                      <h5 className='d-flex align-items-center justify-content-between'>
                        Total: <span>₹{totalAmount}</span>
                      </h5>
                    </div>
                  </div>
                </Col></>
            :<div style={{height:'60vh'} } className='col-12 d-flex justify-content-center align-items-center'>
              
              <img style={{width:'55rem'}} src="https://www.lami.co.in/images/order.gif" alt="order placed" />
              </div>}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
