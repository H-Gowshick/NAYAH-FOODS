import React, { useState } from 'react';
import PaymentComponent from './PaymentComponent';
import axios from 'axios';

function AddressComponent() {
 // State for form fields and validation errors
 const [FirstName, setFirstName] = useState('');
 const [LastName, setLastName] = useState('');
 const [MobileNumber, setMobile] = useState('');
 const [Address, setAddress] = useState('');
 const [Landmark, setLandmark] = useState('');
 const [TownOrCity, setTownCity] = useState('');
 const [State, setState] = useState('');
 const [Pincode, setPincode] = useState('');
 const [validationErrors, setValidationErrors] = useState({});
 const [isAddressAdded, setIsAddressAdded] = useState(false);

 // Function to validate form inputs
 const validateInputs = () => {
   const errors = {};

   if (!FirstName.trim()) {
     errors.FirstName = 'First Name is required';
   }

   if (!LastName.trim()) {
     errors.LastName = 'Last Name is required';
   }

   if (!MobileNumber.trim()) {
     errors.MobileNumber = 'Mobile Number is required';
   }

   if (!Address.trim()) {
     errors.Address = 'Address is required';
   }

   if (!TownOrCity.trim()) {
     errors.TownOrCity = 'Town/City is required';
   }

   if (!State.trim()) {
     errors.State = 'State is required';
   }

   if (!Pincode.trim()) {
     errors.Pincode = 'Pincode is required';
   }

   setValidationErrors(errors);

   return Object.keys(errors).length === 0;
 };

 // Function to handle the "Use this Address" button click
 const handleUseAddress = async () => {
   if (validateInputs()) {
     try {
       // Prepare the data to be sent to the backend
       const addressData = {
         userId: localStorage.getItem('UserId'),
         FirstName,
         LastName,
         MobileNumber,
         Address,
         Landmark,
         TownOrCity,
         State,
         Pincode,
       };

       // Make a PUT request to update the user's address
       await axios.put(`http://localhost:8080/api/updateAddress/${addressData.userId}`, addressData);

       // Set the flag indicating the address has been added
       setIsAddressAdded(true);
     } catch (error) {
       console.error('Error updating address:', error.message);
       // Handle the error, you might want to show a user-friendly error message
     }
   }
 };

  return (
    <>
      {!isAddressAdded ? (
      <div>
        <h5 className='text-center text-white p-3' style={{ background: "#4A5568", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
          Enter a new delivery address
        </h5>
        <div className='row p-2'>
          <div className='col-md-6'>
            <h6>First Name<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.FirstName ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }}  value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            {validationErrors.FirstName && <p style={{ color: 'red', margin: '0' }}>{validationErrors.FirstName}</p>}
          </div>
          <div className='col-md-6'>
            <h6>Last Name<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.LastName ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }} value={LastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            {validationErrors.LastName && <p style={{ color: 'red', margin: '0' }}>{validationErrors.LastName}</p>}
          </div>
        </div>
        <div className='row p-2'>
          <div className='col-md-9'>
            <h6>Mobile Number<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.MobileNumber ? '2px solid red' : 'none',
            }}>
              <input type="number" style={{ border: "none", width: "100%" }} value={MobileNumber} onChange={(e) => setMobile(e.target.value)} />
            </div>
            {validationErrors.MobileNumber && <p style={{ color: 'red', margin: '0' }}>{validationErrors.MobileNumber}</p>}
          </div>
        </div>
        <div className='row p-2'>
          <div className='col-md-7'>
            <h6>Address<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.Address ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }} value={Address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            {validationErrors.Address && <p style={{ color: 'red', margin: '0' }}>{validationErrors.Address}</p>}
          </div>
          <div className='col-md-5'>
            <h6>Landmark <span style={{ color: 'gray' }}>(Optional)</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.Landmark ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }} value={Landmark} onChange={(e) => setLandmark(e.target.value)} />
            </div>
            {validationErrors.Landmark && <p style={{ color: 'red', margin: '0' }}>{validationErrors.Landmark}</p>}
          </div>
        </div>
        <div className='row p-2'>
          <div className='col-md-9'>
            <h6>Town/City<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.TownOrCity ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }} value={TownOrCity} onChange={(e) => setTownCity(e.target.value)} />
            </div>
            {validationErrors.TownOrCity && <p style={{ color: 'red', margin: '0' }}>{validationErrors.TownOrCity}</p>}
          </div>
        </div>
        <div className='row p-2'>
          <div className='col-md-7'>
            <h6>State<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.State ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }} value={State} onChange={(e) => setState(e.target.value)} />
            </div>
            {validationErrors.State && <p style={{ color: 'red', margin: '0' }}>{validationErrors.State}</p>}
          </div>
          <div className='col-md-5'>
            <h6>Pincode<span style={{ color: 'red' }}>*</span></h6>
            <div className='d-flex justify-content-center p-2' style={{
              borderRadius: "10px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: validationErrors.Pincode ? '2px solid red' : 'none',
            }}>
              <input type="text" style={{ border: "none", width: "100%" }} value={Pincode} onChange={(e) => setPincode(e.target.value)} />
            </div>
            {validationErrors.Pincode && <p style={{ color: 'red', margin: '0' }}>{validationErrors.Pincode}</p>}
          </div>
        </div>
        <div className='row p-3 d-flex justify-content-center'>
          <button className='col-md-9 col-9 p-2' style={{
            border: "none",
            borderRadius: "10px",
            background: "#4A5568",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            color: "white"
          }} onClick={handleUseAddress}>
            Use this Address
          </button>
        </div>
      </div>):(
        // Render your new address component here
        // For example, you can replace the following line with your new address component
        <div>
          <PaymentComponent />
        </div>
      )}
    </>
  );
}

export default AddressComponent;
