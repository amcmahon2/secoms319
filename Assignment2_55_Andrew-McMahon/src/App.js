import './index.css';
import React, { useState, useEffect } from 'react';
import data from "./data.json";

export function App() {
  const [Page, changePage] = useState("Browse");
  const [products, setProducts] = useState(data.products);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: '',
    card: '',
    address: '',
    city: '',
    state: '',
    zip: 0
  });

  useEffect(() => { totalPrice(); }, [cart]);

  const totalPrice = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };


  const add = (el) => {
    setCart([...cart, el]);
  };

  const remove = (product) => {
    let index = cart.indexOf(product);
    if (index !== -1) {
      let hardCopy = [...cart];
      hardCopy.splice(index, 1);
      setCart(hardCopy);
    }
  };

  const displayBrowsePage = () => {
    return (
      <div>
        <div>
        <button type='button' className='btn btn-primary m-1 position-absolute top-0 end-0' onClick={e => changePage("Cart")}> Checkout</button>
        </div>
        <div>
          <input id="searchbar" onKeyUp={(e) => productsList()} type="text"
            name="search" placeholder="Search for products"></input>
          <center>
            <h1 className='header-text'>Andrew's kitchen catalog</h1>
            {products.map((product, index) => (
              <div key={index} className="item d-flex align-items-center justify-content-center">
                <div className="productName">
                  {product.productID}
                </div>
                <div className="image">
                  <img src={product.path} width="80" height="80" alt="look at this beautiful kitchen product" />
                </div>
                <div>
                  <button className="minus-mybtn" type="button" name="button" onClick={() => remove(product)}>
                    <span className = "glyphicon glyphicon-minus"></span>
                  </button>
                
                  <span className="cartQuantity">{numInCart(product.productID)}</span>
                  <button className="plus-mybtn" type="button" name="button" onClick={() => add(product)}>
                  <span className = "glyphicon glyphicon-plus"></span>
                  </button>
                </div>

                <div className="price">${product.price}</div>
              </div>
            ))}
          </center>
          <br></br>
        </div>
      </div>
    );
  };

  const productsList = () => {
    let userInput = document.getElementById('searchbar').value
    userInput = userInput.toLowerCase();
    console.log(userInput);
    let displayProducts = data.products.filter(product => product.productID.toLowerCase().includes(userInput));
    setProducts(displayProducts);
    console.log(displayProducts);
  }

  const displayCartPage = () => {
    console.log(cart);
    return (
      <div>
        <div>
          <button type='button' className='btn btn-primary' onClick={e => changePage("Browse")}>Return</button>
        </div>
        <div>
          <h1>Shopping cart</h1>
          {displayCartContents()}
          <h1>Payment</h1>
          <div>

            <div className="row">
              <div className="col-2"></div>

              <div className="col-8">
                <form className="row g-3 checkoutform" id="checkout-form">

                  <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputName" />
                    <div className="valid-feedback">
                      Looks good!
                    </div>
                    <div className="invalid-feedback">
                      Must be like, "John Doe"
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" />
                    
                  </div>

                  <div className="col-12">
                    <label htmlFor="inputCard" className="form-label">Card</label>
                    <div className="input-group mb-3">

                      <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                        aria-label="Username" aria-describedby="basic-addon1" />
                      
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" />
                    
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" />
                    
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <input type="text" className="form-control" id="inputState" />
                    
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
          <button type='button' className = 'btn btn-primary' onClick={e => { validate() ? changePage("Confirmation") : changePage("Cart")}}>Order</button>
          <div id='submitErrorMessage' className='invisible text-danger'>Error with data, unable to proceed.</div>
        
      </div>
    );
  }

  const displayConfirmationPage = () => {
    return (
      <div>
        <div>
          <h1>
            Confirmation
          </h1>
          <div>
            <h2>Cart:</h2>
            {displayCartContents()}
          </div>
          
              <h2 className = 'payment-confirm'>Payment Information:</h2>
              <h3 className = 'payment-confirm'>Full name:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.name}</p>
              <h3 className = 'payment-confirm'>Email address:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.email}</p>
              <h3 className = 'payment-confirm'>Card number:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.card}</p>
              <h3 className = 'payment-confirm'>Address:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.address}</p>
              <h3 className = 'payment-confirm'>City:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.city}</p>
              <h3 className = 'payment-confirm'>State:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.state}</p>
              <h3 className = 'payment-confirm'>Zip code:</h3>
              <p className = 'payment-user-confirm'> {paymentInfo.zip}</p>
          
        </div>
        <div className='text-center'>
        <button type='button' className='btn btn-primary' onClick={e => { alert("Thank you for your order!"); setCart([]); changePage("Browse"); }}>Confirm</button>
          <button type='button' className='btn btn-secondary' onClick={e => { setCart([]); changePage("Browse"); }}>Cancel</button>
        </div>
      </div>
    );
  }

  
  function numInCart(productID) {
    let numItems = cart.filter((cartItem) => cartItem.productID === productID);
    return numItems.length;
  }

  function selectDistinct(cartWithDuplicates) {
    return cartWithDuplicates.filter((cartItem, index) => cartWithDuplicates.indexOf(cartItem) === index);
  }
  let displayCartContents = () => {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {(selectDistinct(cart)).map((product, index) => (
            <tr key={index}>
              <td><img src={product.path} width="80" height="80" alt = "look at this fine kithcen product you're about to buy" /></td>
              <td>{product.productID}</td>
              <td>${product.price} * {numInCart(product.productID)} = {product.price * numInCart(product.productID)}</td>
            </tr>
          ))}
          <tr>
            <th></th>
            <th>Total: </th>
            <td>${cartTotal}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  let validate = () => {
    let val = true;
    let payInfo = {
      name: '',
      email: '',
      card: '',
      address: '',
      city: '',
      state: '',
      zip: 0
    };

    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let card = document.getElementById('inputCard');
    let address1 = document.getElementById('inputAddress');
    let city = document.getElementById('inputCity');
    let state = document.getElementById('inputState');
    let zip = document.getElementById('inputZip');

    
      payInfo.email = email.value
      payInfo.name = name.value
      payInfo.card = card.value
      payInfo.zip = zip.value
      payInfo.address = address1.value;
      payInfo.city = city.value;
      payInfo.state = state.value;
    

    console.log(payInfo);
    setPaymentInfo(payInfo);
    return val;
  }


  if (Page === "Browse") {
    return (
      <div>
        {displayBrowsePage()}
      </div>
    );
  }
  if (Page === "Cart") {
    return (
      <div>
        {displayCartPage()}
      </div>
    );
  }
  if (Page === "Confirmation") {
    return (
      <div>
        {displayConfirmationPage()}
      </div>
    );
  }
}