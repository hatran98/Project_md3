const productService = require("../services/product.service");
module.exports.findAll = async (req, res) => {
  try {
    const { minPrice, maxPrice, sort } = req.query;
    let data;
    if (minPrice && maxPrice) {
      data = await productService.findAllByPriceRange(minPrice, maxPrice);
    } else if (sort) {
      data = await productService.findSort(sort);
    } else {
      data = await productService.findAll();
    }
    let [rows] = data;

    res.json({
      status: "success",
      product: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findOne = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await productService.findOne(id);
    let [rows] = data;
    if (rows.length === 0) {
      res.json({
        message: "Product not Found",
      });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.Create = async (req, res) => {
  let { title, content, price, quantity, image, news } = req.body;
  try {
    await productService.createProduct(
      title,
      content,
      price,
      quantity,
      image,
      news
    );
    res.json({
      message: "Create product successfully",
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports.Update = async (req, res) => {
  const productId = req.params.id;
  const { title, content, price, quantity, image, news } = req.body;
  try {
    const product = await productService.updateProduct(
      title,
      content,
      price,
      quantity,
      image,
      news,
      productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Delete = async (req, res) => {
  const productId = req.params.id;
  try {
    await productService.deleteProduct(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};
