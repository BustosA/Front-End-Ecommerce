import { useState } from "react";

function EditProduct({ product, onSave, onCancel }) {
  const [title, setTitle] = useState(product.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onSave(product.id, { title });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre del producto"
        />
        <button type="submit">Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditProduct;
