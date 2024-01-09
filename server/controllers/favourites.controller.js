const favouritesService = require('../services/favourites.service')
module.exports.findCart = async (req, res) => {
  try {
    const { id } = req.params
    let data = await favouritesService.findCart(id);
    let [rows] = data;
    res.json({
      status: "success",
      cart: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.AddtoCart = async (req, res) => {
  let { productId, userId, quantity } = req.body;

  try {
    let existingCartItem = await favouritesService.getCartItem(productId, userId);
    let [rows] = existingCartItem;

    if (rows.length > 0) {
      const currentQuantity = rows[0].quantity;
      const updatedQuantity = currentQuantity + quantity;
      await favouritesService.updateCartItemQuantity(productId, userId, updatedQuantity);
    } else {
      await favouritesService.InsertToCart(productId, userId, quantity);
    }
    res.json({
      message: "Add to Favourites successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};


module.exports.UpdatetoCart = async (req, res) => {
  let { productId, userId, quantity } = req.body
  try {
    let existingCartItem = await favouritesService.getCartItem(productId, userId);
    let [rows] = existingCartItem
    if (rows.length > 0) {
      await favouritesService.updateCartItemQuantity(productId, userId, quantity);
    } else {
      await favouritesService.InsertToCart(productId, userId, quantity);
    }
    res.json({
      message: "Update to Favourites successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
}
module.exports.DeleteToCart = async (req, res) => {
  const favouritesId = req.params.id
  try {
    await favouritesService.DeleteCartItem(favouritesId);
    res.json({
      message: "Product removed from favourites successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
