const pool = require('../utils/database')

module.exports.findCart = (userId) => {
  return pool.execute(`
    SELECT
    favourites.favouritesId,
    favourites.quantity,
      product.image,
      product.productId,
      product.title,
      product.price,
      users.userId
    FROM favourites
    INNER JOIN product ON product.productId = favourites.productId
    INNER JOIN users ON favourites.userId = users.userId
    WHERE users.userId = ?
  `, [userId]);
}

module.exports.getCartItem = (productId, userId) => {
  return pool.execute(`
      SELECT *
      FROM favourites
      WHERE productId = ? AND userId = ?
    `, [productId, userId])
}

module.exports.InsertToCart = (productId, userId, quantity) => {
  return pool.execute(`
    INSERT INTO favourites(productId, userId, quantity) VALUES (?, ?, ?)
  `, [productId, userId, quantity]);
}

module.exports.updateCartItemQuantity = (productId, userId, quantity) => {
  return pool.execute(` UPDATE favourites
  SET quantity = ?
  WHERE productId = ? AND userId = ?
`, [quantity, productId, userId])
}


module.exports.DeleteCartItem = (favouritesId) => {
  return pool.execute(`DELETE FROM favourites where favouritesId = ?`, [favouritesId])
}
