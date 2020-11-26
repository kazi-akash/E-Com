import express from 'express';
const router = express.Router();
import { getProducts, 
         getProductById, 
         deleteProduct,
         crerateProduct,
         updateProduct,
         createProductReview,
         getTopProducts } from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, crerateProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;

 

// import express from 'express';
// import asyncHandler from 'express-async-handler';
// import Product from '../models/productModel.js';

// const router = express.Router();

// // @desc... Fetch all products
// // @route...Get./api/products
// // @access..Public
// router.get('/', asyncHandler(async (req, res) => {
//   const products = await Product.find({});

//   res.send(products);
// }));

// // @desc... Fetch single products
// // @route...Get./api/products/:id
// // @access..Public
// router.get('/:id', asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if(product)
//     {
//       res.json(product);
//     }
//     else{
//       // res.status(404).json({ message: 'Product not found!'})
//       res.status(404);
//       throw new Error('Product Not found!');
//     }
// }));

// export default router;

