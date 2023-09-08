import { useState } from "react";

function AddProduct({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onAdd({ title });
      setTitle("");
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
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddProduct;