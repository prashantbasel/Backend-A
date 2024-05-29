const path = require('path')
const productModel = require('../models/productModel')
const createProduct = async (req, res) => {

    // checkk incomming data 
    console.log(req.body)
    console.log(req.files)

    // destructuring the body data (json)
    const { productName, productPrice, productCategory, productDescription } = req.body;

    // Validation
    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }

    // validate if there is image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Please upload an image!"
        })
    }

    const { productImage } = req.files;

    // upload image 
    // 1 generate new iimage name(abc.png)-> (2e343-123abc.png)
    const imageName = `${Date.now()}-${productImage.name}`
    // 2 make a upload path(/path/upload - directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)

    // save to database
    const newProduct = new productModel({
        productName: productName,
        productPrice: productPrice,
        productCategory: productCategory,
        productDescription: productDescription,
        productImage: imageName
    })

    const product = await newProduct.save()
    res.status(201).json({
        "success": true,
        "message": "Product created successfully",
        "data": product
    })


    // 3 move to that directory(await, try-catch)
    try {
        await productImage.mv(imageUploadPath)


    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": " Internal Server Error",
            "error": error
        })
    }







};
// fetch all products
const getAllProducts = async (req, res) => {
    // try catch
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Product fetched successfully",
            "product": allProducts
        })

    }catch (error){
        console.log(error) 
        res.status(500).json({
            "success": false,
            "message": " Internal Server Error",
            "error": error
        })

    }
                                                                     
    // fetch all products
    // send response
    
}

module.exports = {
    createProduct,
    getAllProducts
};