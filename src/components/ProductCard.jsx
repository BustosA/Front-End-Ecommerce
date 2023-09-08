import { MdExpandLess, MdExpandMore } from "react-icons/md";
import EditProduct from "./EditProduct";
import "./ProductCard.css";
import { useState } from "react";

function ProductCard({ p, onDelete, onEdit }) {
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
    return <EditProduct product={p} onSave={handleSaveEdit} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <article className="products">
      <h3>{p.title}</h3>
      <div style={{ display: "flex" }}>
        <img src={p.image} alt={p.title} style={{ width: "50%" }} />
        <div>
          <p>{p.category}</p>
          <p>{p.price}</p>
          <button>add to cart</button>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => onDelete(p.id)}>Eliminar</button>
        </div>
      </div>
      {isFullDescription ? (
        <span>
          {p.description} <MdExpandLess size={27} onClick={handleExpand} />
        </span>
      ) : (
        <span>
          {p.description.slice(0, 40)}...{" "}
          <MdExpandMore size={27} onClick={handleExpand} />
        </span>
      )}
    </article>
  );
}

export default ProductCard;
