const cartService = require('../services/cart.service')

module.exports.findCart = async (req, res) => {
  try {
    const { id } = req.params
    let data = await cartService.findCart(id);
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
    let existingCartItem = await cartService.getCartItem(productId, userId);
    let [rows] = existingCartItem;

    if (rows.length > 0) {
      const currentQuantity = rows[0].quantity;
      const updatedQuantity = currentQuantity + quantity;
      await cartService.updateCartItemQuantity(productId, userId, updatedQuantity);
    } else {
      await cartService.InsertToCart(productId, userId, quantity);
    }
    res.json({
      message: "Add to Cart successfully",
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
    let existingCartItem = await cartService.getCartItem(productId, userId);
    let [rows] = existingCartItem
    if (rows.length > 0) {
      await cartService.updateCartItemQuantity(productId, userId, quantity);
    } else {
      await cartService.InsertToCart(productId, userId, quantity);
    }
    res.json({
      message: "Update to Cart successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
}
module.exports.DeleteToCart = async (req, res) => {
  const cartId = req.params.id
  try {
    await cartService.DeleteCartItem(cartId);
    res.json({
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.OrderBy = async (req, res) => {
  try {
    const { userId, address, phone } = req.body;
    const result = await cartService.createOrder(userId, address, phone);
    if (result.orderId !== undefined) {
      res.json({
        success: true,
        message: "Order placed successfully",
        orderId: result.orderId
      });
    } else {
      res.json({
        success: false,
        message: "Failed to place order",
        orderId: null
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the order"
    });
  }
};


module.exports.SelectBill = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await cartService.SelectHistory(userId);
    res.json({
      status: "success",
      history: data,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
}

module.exports.UpdateInfo = async (req, res) => {
  try {
    const userId = req.body.userId
    const { address, phone } = req.body
    const data = await cartService.UpdateInfoOrder(userId, address, phone)
    res.json({
      status: "success",
      history: data,
    });
  } catch (error) {
    console.log(error)
  }
}


module.exports.SelectAll = async (req, res) => {
  try {
    const data = await cartService.SelectAllHistory();
    res.json({
      status: "success",
      history: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error: "An error occurred while fetching history data.",
    });
  }
}

module.exports.UpdateHisto = async (req, res) => {
  const { id } = req.params;
  const { status, orderId } = req.body;
  try {
    const data = await cartService.UpdateHistory(status, id, orderId);
    res.json({
      status: 'success',
      update: data
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports.DeleteHisto = async (req, res) => {
  const { id } = req.params
  try {
    await cartService.DeleteHistory(id);
    res.json({
      message: "History removed successfully",
    });
  }
  catch (error) {
    res.json({
      error,
    });
  }
}

module.exports.Filter = async (req, res) => {
  try {
    const { id } = req.params
    const data = await cartService.FilterHistory(id);
    console.log(data)
    res.json({
      status: "success",
      history: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error: "An error occurred while fetching history data.",
    });
  }
}
