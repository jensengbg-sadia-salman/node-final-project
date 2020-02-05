const cartController = require('../controllers/cart')

module.exports = (express) => {
  const router = express.Router()

  //**GET ALL PRODUCTS **//
  router.get('/', cartController.index)

  //**ADD PRODUCTS IN SHOPING CART **//
  router.post('/cart', cartController.store)

  //**REMOVE PRODUCT FROM SHOPING CART  **//
  router.delete('/cart', cartController.destroy)

  //**GET ALL SHOPING CART PRODUCTS **//
   router.get('/cart', cartController.getCart)


  return router
}