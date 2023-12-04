import React from "react";
import "./UpdateProduct.css";
import { useParams, Link, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const obj = {};

        if (data.get("name")) {
            obj.name = data.get("name");
        }

        if (data.get("description")) {
            obj.description = data.get("description");
        }

        if (data.get("price")) {
            obj.price = data.get("price");
        }

        if (data.get("stock")) {
            obj.stock = data.get("stock");
        }

        if (data.get("image_url")) {
            obj.image_url = data.get("image_url");
        }

        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        }).then((res) => res.json());

        console.log(res);
        window.location.reload();
    };

    return (
        <div className="divUpdate">
            <p>Actualiza aquí los valores del producto. Considera que ninguno es obligatorio</p>
            <form onSubmit={sendData}>
                <div>
                    <label htmlFor="update-product-name">Nombre</label>
                    <input id="update-product-name" type="text" name="name" />
                </div>

                <div>
                    <label htmlFor="update-product-desc">Descripción</label>
                    <input id="update-product-desc" type="text" name="description" />
                </div>

                <div>
                    <label htmlFor="update-product-price">Precio</label>
                    <input id="update-product-price" type="number" name="price" />
                </div>

                <div>
                    <label htmlFor="update-product-stock">Stock</label>
                    <input id="update-product-stock" type="number" name="stock" />
                </div>

                <div>
                    <label htmlFor="update-product-img">Imagen</label>
                    <input id="update-product-img" type="text" name="image_url" />
                </div>

                <button type="submit">Enviar</button>

                <div className="back-to-home">
                    <Link to="/">Volver a la página principal</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
