'use client';
import React, { useEffect } from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(
    reducer,
    null
  );

  useEffect(() => { // side effect: create initial state
    const savedItems = window.localStorage.getItem('cart-items');
    dispatch({
      type: 'initialize',
      items:  savedItems === null ? [] : JSON.parse(savedItems),
    })
  },[]);

  useEffect(() => { // side effect: cache all cart changes
    if (items !== null) {
      window.localStorage.setItem(
        'cart-items',
        JSON.stringify(items)
      );
    }
  },[items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
