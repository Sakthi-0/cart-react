import React, { useState, useEffect } from "react";
import { IoMdCart } from "react-icons/io";
import data from "./data.json";

const Content = () => {
  const [list, setList] = useState(data);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [totalVal, setTotalVal] = useState(0);
  const [stocks, setStocks] = useState(0);

  function handleChange(e) {
    let orderVal = e.target.value;
    setValue(orderVal);

    if (orderVal === "") {
      setList(data);
    } else {
      let filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(orderVal.toLowerCase())
      );
      setList(filteredItems);
    }
  }

  function handleFilter(e) {
    let selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "All") {
      setList(data);
    } else {
      let filteredItems = data.filter((item) => item.category === selectedCategory);
      setList(filteredItems);
    }
  }

  function handleCart(product) {
    let existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleRemove(index) {
    let updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  }

  function handleAdd(productName) {
    setCart(
      cart.map((item) =>
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleSub(productName) {
    setCart(
      cart
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  useEffect(() => {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let totalStock = cart.reduce((acc, item) => acc + item.quantity, 0);

    setTotalVal(total);
    setStocks(totalStock);
  }, [cart]);

  return (
    <div className="full-container">
      <div className="cont-inp-list">
        <div className="container">
          <div className="input-cont">
            <label>Category:</label> <br />
            <select className="select" onChange={handleFilter} value={category}>
              <option>All</option>
              <option>T-Shirts</option>
              <option>Jeans</option>
              <option>Jackets</option>
              <option>Pants</option>
              <option>Suits</option>
              <option>Shirts</option>
              <option>Shorts</option>
            </select>
          </div>

          <div className="input-cont1">
            <label>Search:</label> <br />
            <input
              type="text"
              value={value}
              className="input"
              onChange={handleChange}
              placeholder="Search Products Here"
            />
          </div>
        </div>

        <ol className="list-cont">
          {list.map((item, index) => (
            <li key={index} className="listItem"> <img src={ item.img_src } /> <br/>
              {item.name} <br /> {item.size} <br /> {item.category} <br />
              Stocks: {item.stock} <br />$ {item.price} <br />
              <button onClick={() => handleCart(item)}>Add to Cart</button>
            </li>
          ))}
        </ol>
      </div>

      <div className="cart">
        <div className="cart-head">
          <h2>
            <IoMdCart />
          </h2>
          {/* <h4> Cart </h4> */}
        </div>

        <div className="current-bill">
          {cart.map((item, index) => (
            <li key={index} className="listItem"> <img src={ item.img_src } /> <br/>
              {item.name} <br /> {item.size} <br /> {item.category} <br />
              Stocks: {item.stock} <br />$ {item.price} <br />
              Qty:
              <button className="btn" onClick={() => handleAdd(item.name)}>
                +
              </button>
              {item.quantity}
              <button className="btn" onClick={() => handleSub(item.name)}>
                -
              </button>
              <br />
              <button className="btn-remove" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </li>
          ))}
        </div>

        <div>
          <h3>Total Bill: ${totalVal.toFixed(2)}</h3>
          <h3>Total Items: {stocks}</h3>
        </div>
      </div>
    </div>
  );
};

export default Content;
