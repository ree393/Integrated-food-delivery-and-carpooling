import React from 'react';
import Slider from 'react-slick';
import ava01 from '../../../assets/images/ava-1.jpg';
import ava02 from '../../../assets/images/ava-2.jpg';
import ava03 from '../../../assets/images/ava-3.jpg';
import ava04 from '../../../assets/images/ava-4.jpg';
import '../../../styles/slider.css';

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoPlay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className='review__text'>
        I was impressed by the exceptional service provided by Meal & Ride. The ordering process was seamless, and the support team was quick to address any queries I had. The meal was delicious, and the ride was exhilarating. Overall, it was a fantastic experience, and I would definitely recommend it to others.
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <h6>John Doe</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
        Meal & Ride surpassed all my expectations. The meal options were diverse, catering to all dietary preferences. The ride was equally impressive, offering breathtaking views and adrenaline-pumping moments. It was a seamless experience from start to finish, and I can't wait to do it again!
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <h6>Steven Crock</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
        Ordering from Meal & Ride was incredibly convenient. The process was straightforward, and the delivery was prompt. The food exceeded my expectations in terms of quality and taste. Plus, the ride was an added bonus, making it a complete package. I highly recommend Meal & Ride to anyone looking for a memorable dining and adventure experience!
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <h6>Missi Lou</h6>
        </div>
      </div>
      <div>
        <p className='review__text'>
        My experience with Meal & Ride was nothing short of unforgettable. The meal options were delicious, and the portions were generous. The ride was the highlight of the experience, offering breathtaking views and thrilling moments. It was the perfect combination of culinary delight and adventure, leaving me eager to try it again.
        </p>
        <div className='slider__content d-flex align-items-center gap-3'>
          <h6>Karen Doe</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
