const { Product, Category } = require('../database/models');
const ImageKit = require('imagekit');

require('dotenv').config();


const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/naum4sbu8x9d",
  publicKey:  "public_PabaQnCAC82dPobNEphBVosoAEA=",
  privateKey: "private_cqZa45CP0B******************"
});

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log(products)
    if (!products) {
      throw new Error(`can't get the products`);
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'successfully retrived data',
      data: products,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllCategory = async (req, res, next) => {
  const category = await Category.findAll({inclu: 'category'});

  if (!category) {
    throw new Error(`can't get the categories`);
  }

  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'successfully retrived data',
    data: category,
  });
};

exports.newProduct = async (req, res, next) => {
  const productData = req.body;

  try {
    const product = await Product.create(productData);

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'successfully deleted data',
      data: product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id, title, description, image, price, stock } = req.body;

  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });

    product.update({
      title,
      description,
      image,
      price,
      stock,
    });

    product.save();

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'successfully retrived data',
      data: product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    product.destroy();
  } catch (error) {
    console.log(error.message);
  }

  return res.status(201).json({
    status: 'success',
    code: 201,
    message: 'successfully deleted data',
  });
};

exports.uploadImageAuth = async (req, res, next) => {
  const result = imagekit.getAuthenticationParameters();

  return res.status(200).send(result);
};