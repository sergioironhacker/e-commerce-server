const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');






const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }

});


const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const updateProduct = await Product.findByIdAndUpdate({ id }, req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error)
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);

        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error)
    }
});



const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});


const getallProducts = asyncHandler(async (req, res) => {
    try {

        const queryObj = { ...req.query }
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el])


        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        const query = Product.find(JSON.parse(queryStr));


            if (req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy);
            } else {
                query = query.sort('-createdAt');
            }


            if (req.query.fields) {
                const fields = req.query.fields.split(',').join(' ');
                query = query.select(fields);
            } else  {
                    query=query.select('-__v')
            }



            


        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});


const filteredProduct = asyncHandler(async (req, res) => {
    const { minprice, maxprice, color, category, availability, brand } = req.params;

    try {
        const filteredProduct = await Product.find({
            price: {
                $gte: minprice,
                $lte: maxprice,

            },
            category,
            brand,
            color,
        });
        res.json(filteredProduct)
    } catch (error) {
        res.json(error)
    }

    res.json({ minprice, maxprice, color, category, availability, brand });
});


module.exports = { createProduct, getaProduct, getallProducts, filteredProduct, updateProduct, deleteProduct, };
