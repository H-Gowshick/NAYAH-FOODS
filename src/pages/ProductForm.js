// ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    ProductImage: '',
    ProductName: '',
    Price: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'ProductImage') {
      // Handle file input separately to show a preview
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, [e.target.name]: reader.result });
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/products', formData);
      alert('Product added successfully!');
      // Reset form and preview after successful submission
      setFormData({
        ProductImage: '',
        ProductName: '',
        Price: '',
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Image:
          <input type="file" name="ProductImage" onChange={handleChange} />
          {imagePreview && <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        </label>
        <br />
        <label>
          Product Name:
          <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} />
        </label>
        <br />
       
        <label>
          Price:
          <input type="number" name="Price" value={formData.Price} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
