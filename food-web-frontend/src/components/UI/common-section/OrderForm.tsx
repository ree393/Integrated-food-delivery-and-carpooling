import React, { useEffect, useState } from 'react';
import { IOrder } from '../../Order/models/IOrder';
import LocationSelector from './LocationSelector';
import { FirebaseOrderRepo } from '../../Order/repo/FirebaseEventRepo.ts';
import { showSuccessToast } from '../../Order/utils/events-utils.ts';


const OrderForm = () => {
  const [position, setPos] = useState({ lat: 31.3260, lng: 75.5762 });
const [loader,setLoader]=useState(false);
const [isSuccess,setSuccess]=useState(false) 
const getRandomTotal = () => Math.floor(Math.random() * (200 - 100 + 1)) + 100;
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randomNumber = getRandomNumber(10, 30);
const getCurrentTimeInIST = () => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};
const [fixedTime, setFixedTime] = useState('');

  useEffect(() => {
    const time = getCurrentTimeInIST();
    setFixedTime(time);
  }, []);

 

  const [order, setOrder] = useState<IOrder>({
    id: '',
    items: [],
    total: getRandomTotal(),
    user: {
      uid: '',
      userName: '',
      email: '',
      phone: ''
    },
    location: { lat: 0, long: 0 },
    type:'Ride',
    shippingAddress:null,
    date:new Date()
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      user: {
        ...order.user,
        [name]: value
      }
    });
  };

  

  const handleFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    order.location.lat=position.lat
    order.location.long=position.lng
    const orderRepo = new FirebaseOrderRepo();
setLoader(true)
   await orderRepo.saveOrder(order)
   setLoader(false)
   setSuccess(true)
    
  };

  return (
    
    <div className="container mt-5">
      {!isSuccess ?
            <>
      <LocationSelector  setPos={setPos}></LocationSelector>
      <h6 className='my-5'>Personal Details</h6>
      <form onSubmit={handleFormSubmit}>
       
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={order.user.userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={order.user.email || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={order.user.phone}
            onChange={handleInputChange}
            required
          />
        </div>
<div className='d-flex flex-column mb-3'>

<b className='mb-3'>Total : ₹{order.total}</b>
<b>Payment Type : Cash</b>
</div>

        <button  type="submit" className="btn btn-danger"> {loader ? 'Loading..':"Book Now"}</button>
      </form>
      </>
            :<div className='col-12 d-flex justify-content-center align-items-center'>
              <div className='text-center mb-5'>

              <img style={{width:'55rem'}} src="https://i.pinimg.com/originals/57/07/26/570726f9398849aa200fbcba9466f9f2.gif" alt="order placed" />
              <h3 className='mt-4'>Ride Booked Successfully</h3>
              <h3 className="mt-4">price to paid: ₹{order.total}</h3>
              <h3 className="mt-4">Ride Booked time: {fixedTime} </h3>
              <h3 className="mt-4">Our Ride service Provider come with in {randomNumber} minutes</h3>
              </div>
              </div>}
    </div>
  );
};

export default OrderForm;
