import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import Login from "./components/Login";

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleChangeText = (e) => {
    setSearchText(e.target.value);
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
        {products
          .filter((prod) =>
            prod.title
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase())
          )
          .map((p) => (
            <ProductCard p={p} key={p.id} />
          ))}
      </main>
    </div>
  );
}

export default App;
