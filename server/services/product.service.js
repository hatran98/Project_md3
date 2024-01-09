const pool = require("../utils/database");
module.exports.findAll = () => {
  return pool.execute("SELECT * FROM product");
};
module.exports.findAllByPriceRange = (minPrice, maxPrice) => {
  return pool.execute(
    "SELECT * FROM product WHERE price BETWEEN ? AND ? ORDER BY price ASC",
    [minPrice, maxPrice]
  );
};

module.exports.findNew = (news) => {
  return pool.execute("SELECT * FROM product WHERE news = ?", [news]);
};
module.exports.findPromotion = (promotion) => {
  return pool.execute("SELECT * FROM product WHERE promotion = ?", [promotion]);
};
module.exports.findSearchName = (title) => {
  return pool.execute(`SELECT * FROM product WHERE title LIKE ?`, [
    `%${title}%`,
  ]);
};
module.exports.find;
module.exports.findOne = (id) => {
  return pool.execute("SELECT * FROM product WHERE productId = ?", [id]);
};

module.exports.createProduct = (
  title,
  content,
  price,
  quantity,
  image,
  news
) => {
  return pool.execute(
    "INSERT INTO product (title,content,price,quantity,image,news) VALUES (?,?,?,?,?,?)",
    [title, content, price, quantity, image, news]
  );
};

module.exports.updateProduct = (
  title,
  content,
  price,
  quantity,
  image,
  news,
  productId
) => {
  return pool.execute(
    "UPDATE product SET title = ?, content = ?, price = ?, quantity = ?, image = ?, news = ? WHERE productId = ?",
    [title, content, price, quantity, image, news, productId]
  );
};

module.exports.deleteProduct = (productId) => {
  return pool.execute("DELETE FROM product where productId =?", [productId]);
};
