// Variables
const ProductList = document.querySelector('#product-list tbody');
const body = document.getElementsByTagName('body');
const cartIcon = document.getElementById('img-c');
body.addEventListener('load', render());



function render() {
  cartIcon.addEventListener('mouseover', getToCart);
  
  setInterval(function(){ getToCart(); }, 2000);

  //** FETCH PRODUCTS **//
  (async function getAllPropducts() {
    try {
      const ajaxRequestHeaders = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });
      let body = {
        method: "GET",
        headers: ajaxRequestHeaders
      };

      let response = await fetch(`http://localhost:3000`, body);
      let res = await response.json();
      showData(res.data);

    } catch (err) { console.log('Error:', err) }

  })()

  //** SHOW PRODUCTS **//
  function showData(data) {

    data.map(function (e, i) {
      const div = document.createElement('div');
      div.innerHTML = ` <div class="product__item">
  <div class="product__card">
    <img src="${e.url}" class="image__product">
    <div class="info__card">
      <h4>${e.name}</h4>
      <p><span class="price">${e.price}  </p>
      <button class="addto-cart" id="${e.id}" data-id="${e.id}"><i class="fa fa-cart-plus"></i>&nbsp;  ADD TO CART</button>
      
      </div>
  </div> <!--.card-->
</div>`;

      document.getElementById('Product__container').appendChild(div);
      document.getElementById(e.id).addEventListener("click", () => AddToCart(e));
    })
  }


  //** GET FROM CART **//
  async function getToCart() {
    EmptyCart();
    try {
      const ajaxRequestHeaders = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });
      let body = {
        method: "GET",
        headers: ajaxRequestHeaders
      };

      let response = await fetch(`http://localhost:3000/cart`, body);
      let res = await response.json();
      document.getElementById('productCount').innerHTML = res.data.length
      
      showCart(res.data);
      return res

    } catch (err) {
      console.log('Error:', err)
    }

  }

  //        //** ADD TO CART **//
  const AddToCart = async (data) => {
    const dbCart = (await getToCart()).data;
    const isAlreadyInDBCart = Boolean(dbCart.filter(item => item.id == data.id)[0]);
    console.log('DB CART', dbCart);
    console.log('is in DB', isAlreadyInDBCart)
    if (isAlreadyInDBCart) {
      alert('Item already exists')
    } else {
      console.log('Add to the cart');
      fetch("http://localhost:3000/cart", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          console.log('CART++', response)
        });
    }
  }



  // //** REMOVE FROM CART **//
  const RemoveFromCart = (data, i) => {
    console.log('DELETE', data)
    fetch("http://localhost:3000/cart", {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        document.getElementById(`cart-item-${i}`).remove()
      });

  }

  //** SHOW PRODUCTS CART**//
  function showCart(data) {
    console.log('SHOW CARTS DATA++', data.length)
    data.map(function (e, i) {
      const row = document.createElement('tr');
      row.id = `cart-item-${i}`
      row.innerHTML = `
    <td>
    <img src="${e.url}" >
    </td>
    <td>${e.name}</td>
    <td>${e.price}</td>
    <td>
    <button class="borrar-curso" id="${e.id}" data-id="${e.id}">X</button>
    </td>
    `;
     ProductList.appendChild(row);
     document.getElementById(e.id).addEventListener("click", () => RemoveFromCart(e, i));

    }
    )
  }


  function EmptyCart() {
    while (ProductList.hasChildNodes()) {
      ProductList.removeChild(ProductList.firstChild);
    }
  }

}

