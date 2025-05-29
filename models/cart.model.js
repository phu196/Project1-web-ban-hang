const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: String,
    products: Array,
    expireAt: {
      type: Date,
      // Tự động xóa tài liệu khi `expireAt` đã qua (TTL index)
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Đảm bảo `expireAt` được sử dụng như một TTL index
cartSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;
