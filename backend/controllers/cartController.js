import userModel from "./../model/userModel.js";

//add items to user cart
export const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cartData) {
      user.cartData = {};
    }

    // Add or update item
    if (user.cartData[itemId]) {
      user.cartData[itemId] += 1;
    } else {
      user.cartData[itemId] = 1;
    }

    user.markModified("cartData"); // 👈 Necessary for plain object
    await user.save();

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding item to cart" });
  }
};

// remove items from user cart
export const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user || !user.cartData || user.cartData[itemId] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    console.log("Before Removal:", user.cartData);

    if (user.cartData[itemId] > 1) {
      user.cartData[itemId] -= 1;
    } else {
      delete user.cartData[itemId];
    }

    user.markModified("cartData");
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item removed or quantity decreased",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("RemoveFromCart Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
    });
  }
};

//fetch cart data// cartController.js
export const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId); // ✅ using req.userId
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};
