import { MdExpandLess, MdExpandMore } from "react-icons/md";
import EditProduct from "./EditProduct";
import "./ProductCard.css";
import { useState } from "react";
import { Link } from "react-router-dom"

function ProductCard({ p, onDelete, onEdit, onAddToCart }) {
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleExpand = () => {
    setIsFullDescription(!isFullDescription);
  };

  const handleSaveEdit = (id, updatedProduct) => {
    onEdit(id, updatedProduct);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditProduct
        product={p}
        onSave={handleSaveEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <article className="products">
      <div className="product-image-container">
        <img src={p.image_url} alt={p.name} />
      </div>
      <h3 className="h3-products">{p.name}</h3>
      <span>{p.description.slice(0, 100)}... </span>
      <div>
        <span className="category">{p.category}</span>
        <button>
          <Link to={"/product/"+p.id}>Actualizar</Link>
        </button>
      </div>
      <div className="div-cart">
        <p className="price">${p.price}</p>
        <button className="add-to-cart" onClick={() => onAddToCart(p)}>
          Añadir al Carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
