import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../reducers/cart";

function Product({ id, name, price }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addItem({ id, name, price }));
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>{price}</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
}
