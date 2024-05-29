const router = require('express').Router();
const productController = require('../controllers/productControllers')

// Creating user registration route 

router.post('/create', productController.createProduct)

// fetch all products
router.get('/get_all_products', productController.getAllProducts)



// exporting the router 
module.exports = router