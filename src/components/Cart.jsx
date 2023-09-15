import React from "react";

function Cart({ cartItems, onRemoveFromCart }) {
  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}</p>
    </div>
  );
}

export default Cart;
