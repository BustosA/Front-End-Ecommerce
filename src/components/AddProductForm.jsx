import React, { useState } from "react";
import axios from "axios";
import "./AddProductForm.css";

function AddProductForm({ onAddProduct }) {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image_url: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                "http://localhost:3000/products",
                newProduct
            );
    
            // Utiliza la información de la respuesta del servidor en lugar de newProduct
            const addedProduct = response.data;
    
            // Llamada a la función proporcionada por el componente padre con la información correcta
            onAddProduct(addedProduct);
    
            // Limpiar el formulario después de agregar el producto
            setNewProduct({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "",
                image_url: "",
            });
    
            console.log("Producto agregado correctamente:", addedProduct);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    };

    return (
        <div className="add-product-form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Descripción:
                    <input
                        type="text"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Precio:
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Stock:
                    <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Categoría:
                    <input
                        type="text"
                        name="category"
                        value={newProduct.category}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    URL de la imagen:
                    <input
                        type="text"
                        name="image_url"
                        value={newProduct.image_url}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
}

export default AddProductForm;
