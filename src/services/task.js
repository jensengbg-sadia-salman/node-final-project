const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
const initialData = {
  products: [],
  cart: []
}

db.defaults(initialData).write()

//** GET PRODUCTS **//
exports.get = () => (
  db.get('products').value()
)


//** ADD TO CART **//
exports.save = (cart) => (
  db.get('cart')
    .push(cart)
    .write()
)

//** GET ALL PRODUCTS FROM CART **//
exports.getCart = () => (
  db.get('cart').value()
)

//** REMOVE A PRODUCT FROM CART **//
exports.remove = (id) => (
  db.get('cart')
    .remove({ id })
    .write()
)