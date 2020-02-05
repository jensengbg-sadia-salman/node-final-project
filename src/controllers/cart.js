const task = require('../services/task')
const uuid = require('uuid')


//** GET PRODUCTS **//
exports.index = (req, res) => {
  const data = task.get('products')

  res.json({
    status: 'OK',
    message: 'success',
    data,
  })
}


//** ADD TO CART **//
exports.store = async (req, res) => {
  const obj = req.body
  // obj.id = uuid()
console.log('API',obj)
  await task.save(obj)

  res.json({
    status: 'OK',
    message: 'success',
    data: obj
  })
}

//** GET ALL PRODUCTS FROM CART **//
exports.getCart = (req, res) => {
  const data = task.getCart('cart')

  res.json({
    status: 'OK',
    message: 'success',
    data,
  })
}


//** REMOVE A PRODUCT FROM CART **//
exports.destroy = async (req, res) => {
  // const { id } = req.params
  const { id } = req.body

  await task.remove(id)

  res.json({
    status: 'OK',
    message: 'data successfully deleted.',
    data: null,
  })
}