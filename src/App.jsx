// App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import Login from "./components/Login";
import Slider from "./components/Slider";
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
      setCartItems(prevItems => [...prevItems, product]);
  };

  const handleRemoveFromCart = (id) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((prod) => setProducts(prod));
  }, []);

  return (
    <div>
      <header>
        <Logo />
        <SearchBar onChangeText={handleChangeText} />
        <Login />
      </header>
      <main>
                <Slider />
                <article className="products">
                    {products
                        .filter(prod => prod.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
                        .map(p => (
                            <ProductCard p={p} key={p.id} onDelete={handleDeleteProduct} onEdit={handleEditProduct} onAddToCart={handleAddToCart} />
                        ))}
                </article>
                <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
            </main>
        </div>
  );
}

export default App;
