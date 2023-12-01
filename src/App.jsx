import { useEffect, useState } from "react";
import "./App.css";
import "./components/Reset.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import Login from "./components/Login";
import Slider from "./components/Slider";
import Cart from "./components/Cart";
import CategoryFilter from "./components/CategoryFilter";
import SortDropdown from "./components/SortDropdown";
import CartIcon from "./components/CartIcon";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UpdateProduct from "./components/UpdateProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 20;

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
      fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProducts(data);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  useEffect(() => {
    fetch("http://localhost:3000/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    let sortedProducts = [...products];

    switch (sortOrder) {
      case "menorAMayor":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "mayorAMenor":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  }, [sortOrder]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/carrito" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/" element={
          <>
            <header>
              <div className="background">
                <Logo />
                <SearchBar onChangeText={handleChangeText} />
                <div className="right-group">
                <Login />
                </div>
              </div>
            </header>
            <main className="main">
              <Slider />
              <CategoryFilter categories={categories} onSelectCategory={setSelectedCategory} />
              <SortDropdown onChangeSortOrder={setSortOrder} currentSortOrder={sortOrder} />
              <div className="div-article">
                <article className="products">
                  {products
                    .filter(
                      (prod) =>
                        !selectedCategory || prod.category === selectedCategory
                    )
                    .filter((prod) =>
                      prod.name
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
                </article>
              </div>

              {/* <div className="pagination">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div> */}
            </main>
            <footer>
              <p>
                Para más información contáctanos en las siguientes redes:{" "}
                <a href="https://www.instagram.com" target="_blank">
                  Instagram
                </a>
                ,{" "}
                <a href="https://web.whatsapp.com" target="_blank">
                  whatsapp
                </a>{" "}
                y{" "}
                <a href="https://twitter.com" target="_blank">
                  twitter
                </a>
              </p>
              </footer>
          </>
        }/>
        <Route path="/product/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
