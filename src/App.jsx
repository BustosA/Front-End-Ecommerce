import { useEffect, useState } from "react";
import "./App.css";
import "./components/Reset.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import Login from "./components/Login";
import Slider from "./components/Slider";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [menorAMayor, setMenorAMayor] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Inicializa en 1 página por defecto
  const productsPerPage = 20; // Puedes ajustar este valor según tus necesidades

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (id, updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${productsPerPage}&page=5`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  useEffect(() => {
    const nuevoOrden = products.sort((a, b) => {
      if (menorAMayor === true) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProducts([...nuevoOrden]);
  }, [menorAMayor]);

  return (
    <div>
      <header>
        <div className="background">
          <Logo />
          <SearchBar onChangeText={handleChangeText} />
          <Login />
        </div>
      </header>
      <main className="main">
        <Slider />
        <div className="div-article">
          <article className="products">
            {products
              .filter((prod) =>
                prod.title
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase())
              )
              .map((p) => (
                <ProductCard
                  p={p}
                  key={p.id}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}

            <button onClick={() => setMenorAMayor(!menorAMayor)}>
              Cambiar orden
            </button>
          </article>
        </div>

        <div className="pagination">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
        <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
      </main>
    </div>
  );
}

export default App;
