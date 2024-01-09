const pool = require('../utils/database')

module.exports.findCart = (userId) => {
  return pool.execute(`
    SELECT
      cart.cartId,
      cart.quantity,
      product.image,
      product.productId,
      product.title,
      product.price,
      users.userId
    FROM cart
    INNER JOIN product ON product.productId = cart.productId
    INNER JOIN users ON cart.userId = users.userId
    WHERE users.userId = ?
  `, [userId]);
}

module.exports.getCartItem = (productId, userId) => {
  return pool.execute(`
      SELECT *
      FROM cart
      WHERE productId = ? AND userId = ?
    `, [productId, userId])
}

module.exports.InsertToCart = (productId, userId, quantity) => {
  return pool.execute(`
    INSERT INTO cart(productId, userId, quantity) VALUES (?, ?, ?)
  `, [productId, userId, quantity]);
}

module.exports.updateCartItemQuantity = (productId, userId, quantity) => {
  return pool.execute(` UPDATE cart
  SET quantity = ?
  WHERE productId = ? AND userId = ?
`, [quantity, productId, userId])
}


module.exports.DeleteCartItem = (cartId) => {
  return pool.execute(`DELETE FROM cart where cartId = ?`, [cartId])
}

module.exports.createOrder = async (userId, address, phone) => {
  try {
    const insertOrderQuery = `
      INSERT INTO \`order\` (userId, total, createDate, status, method, address, phone)
      SELECT
          ? AS userId,
          SUM(p.price * c.quantity) AS total,
          NOW() AS createDate,
          'pending' AS status,
          'method_here' AS method,
          ? AS address,
          ? AS phone
      FROM cart c
      JOIN product p ON c.productId = p.productId
      WHERE c.userId = ?
      GROUP BY c.userId;
    `;

    await pool.execute(insertOrderQuery, [userId, address, phone, userId]);

    const [orderIdRows] = await pool.execute(`SELECT LAST_INSERT_ID() AS orderId`);
    const orderId = orderIdRows[0].orderId;

    const insertOrderDetailsQuery = `
      INSERT INTO order_details (orderId, productId, title, image, quantity, price)
      SELECT
          ? AS orderId,
          c.productId,
          p.title,
          p.image,
          c.quantity,
          p.price
      FROM cart c
      JOIN product p ON c.productId = p.productId
      WHERE c.userId = ?;
    `;

    await pool.execute(insertOrderDetailsQuery, [orderId, userId]);

    await pool.execute(`DELETE FROM cart WHERE userId = ?`, [userId]);

    return {
      orderId: orderId
    };
  } catch (error) {
    throw error;
  }
};


module.exports.SelectHistory = async (userId) => {
  try {
    const [data] = await pool.execute(`
      SELECT order_details.* ,order.status , order.phone , order.address , order.total
      FROM order_details
      JOIN \`order\` ON order_details.orderId = \`order\`.orderId
      JOIN users ON \`order\`.userId = users.userId
      WHERE users.userId = ?`, [userId]);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



module.exports.SelectAllHistory = async () => {
  try {
    const [data] = await pool.execute("SELECT * FROM `order`");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports.FilterHistory = async (orderId) => {
  try {
    const [data] = await pool.execute(`
      SELECT order_details.*
      FROM order_details
      WHERE order_details.orderId = ?;
    `, [orderId]);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports.UpdateInfoOrder = async (userId, address, phone) => {
  try {
    await pool.execute(
      `UPDATE \`order\` SET address = ?, phone = ? WHERE userId = ?`,
      [address, phone, userId]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.UpdateHistory = async (status, userId, orderId) => {
  try {
    await pool.execute(`UPDATE \`order\` SET status = ? WHERE userId = ? AND orderId = ?`, [status, userId, orderId]);
  } catch (error) {
    console.log(error);
  }
};


module.exports.DeleteHistory = async (orderId) => {
  try {
    await pool.execute(`DELETE FROM order_details WHERE orderId = ?`, [orderId]);
    await pool.execute(`DELETE FROM \`order\` WHERE orderId = ?`, [orderId]);
  } catch (error) {
    console.log(error);
  }
};
