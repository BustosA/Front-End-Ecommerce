import React, { useState } from 'react';
import "./AddProductForm.css";

function AddProductForm({ onAddProduct }) {
    const [newProduct, setNewProduct] = useState({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image_url: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddProduct(newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image_url: '',
      });
    };
  
    return (
        <div className="add-product-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
        </label>
        {/* Repite este patrón para otros campos del producto */}
        <label>
          Descripción:
          <input name="description" value={newProduct.description} onChange={handleChange} required />
        </label>
        <label>
          Precio:
          <input type="text" name="price" value={newProduct.price} onChange={handleChange} required />
        </label>
        <label>
        Stock:
        <input type="text" name="stock" value={newProduct.stock} onChange={handleChange} required />
      </label>
        <label>
          Categoría:
          <input type="text" name="category" value={newProduct.category} onChange={handleChange} required />
        </label>
        <label>
          URL de la imagen:
          <input type="text" name="image_url" value={newProduct.image_url} onChange={handleChange} required />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>
      </div>
    );
  }
  
  export default AddProductForm;
  