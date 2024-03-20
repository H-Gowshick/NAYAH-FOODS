import React, { useRef, useState } from 'react';
import NayahLogo from '../images/NayahLogo.png';
import GPayQR from '../images/GooglePayQr.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';

function OnlinePayComponent() {
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');
  const [base64Screenshot, setBase64Screenshot] = useState('');

  const navigate = useNavigate();

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setUploadError('Please select a file before uploading.');
      return;
    }

    setUploadError(null);

    // Convert the selected file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Screenshot(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownloadClick = () => {
    // Example: Download the GPayQR image
    const link = document.createElement('a');
    link.href = GPayQR; // Replace with the actual path to your image
    link.download = 'gpay_qr.jpg';
    link.click();
  };

  const handlePlaceOrderClick = () => {
    // Check if a screenshot has been uploaded before placing an order
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadError('Please upload a screenshot before placing an order.');
      console.log('Cannot place an order without a valid screenshot.');
      return;
    }

    // Continue with the logic for placing an order
    setUploadError(null);
    console.log('Order placed successfully!');
    navigate("/thinkspage");

    // Access the base64 screenshot data
    console.log('Base64 Screenshot:', base64Screenshot);
  };

  return (
    <div className='py-3 px-4'>
      <h6>
        <b>ONLINE PAYMENT</b>
      </h6>
      <div
        style={{
          borderRadius: '10px',
          background: '#D9D9D9',
          boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className='py-4 px-5'>
          <div className='d-flex justify-content-center'>
            <img src={NayahLogo} width='55px' alt='Nayah Logo' />
            <h3>Nayah Foods</h3>
          </div>
          <div
            className='d-flex flex-column justify-content-center'
            style={{
              borderRadius: '10px',
              background: '#FFF',
            }}
          >
            <img className='p-3' src={GPayQR} alt='Google Pay QR' />
            <p className='text-center'>UPI ID: Tnxtindia0707-1@yoakis</p>
          </div>
          <h5 className='p-2 text-center'>Scan to pay with any UPI app</h5>
          <div className='d-flex justify-content-center align-items-center'>
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <div
              onClick={handleFileUploadClick}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <AddPhotoAlternateIcon fontSize='large' />
              <h5 className='p-1 my-3'>Upload Screenshot</h5>
            </div>
          </div>
          {uploadError && (
            <div className='text-danger text-center'>
              <p>{uploadError}</p>
            </div>
          )}
          <div className='p-2'>
            <h6 className='text-danger text-center'>
              *MAKE SURE TO UPLOAD YOUR SCREENSHOT AFTER PAYMENT IS SUCCESSFUL*
            </h6>
          </div>
          <div className='p-2 d-flex justify-content-center'>
            <button className='btn btn-success' onClick={handleDownloadClick}>
              Download
            </button>
          </div>
          <div className='p-2 d-flex justify-content-center'>
            <button
              className='col-md-9 col-9 p-2'
              style={{
                border: 'none',
                borderRadius: '10px',
                background: '#4A5568',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                color: 'white',
              }}
              onClick={handlePlaceOrderClick}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlinePayComponent;
