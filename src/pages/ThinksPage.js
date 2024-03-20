import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderPlaced from '../images/OrderPlace.svg';

function ThinksPage() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation once the component is mounted
    setIsImageLoaded(true);
  }, []);

  return (
    <>
       <div className={`container text-center p-5 ${isImageLoaded ? 'image-fall-from-sky' : ''}`}>
         <img
          src={OrderPlaced}
          width="50%"
          style={{ opacity: isImageLoaded ? 1 : 0 }}
          alt="Order Placed"
          onLoad={() => setIsImageLoaded(true)}
        />
        <h1>Thank You</h1>
        <h4>Your order has been placed successfully</h4>
        <p>For more details, check your order.</p>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-3'>
            <button
              className='btn'
              style={{
                borderRadius: "10px",
                border: "1px solid #000",
                background: "#FFF",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                width: "100%"
              }}
            >
              View Order
            </button>
          </div>
          <div className='col-md-3'>
            <Link to='/'>
              <button
                className='btn'
                style={{
                  background: "#98CE17",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  width: "100%",
                  color: "white"
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThinksPage;
