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
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

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
    fetch(`https://fakestoreapi.com/products?limit=${productsPerPage}&page=5`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
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
      case "A-Z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  }, [sortOrder]);

  return (
    <Router>
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
                <CartIcon />
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
      </Routes>
    </Router>
  );
}

export default App;