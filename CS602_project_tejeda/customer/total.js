module.exports = (items) => {
  return items.reduce((acc, item) => {
    item.totalPrice = item.product.price * item.quantity;
    return acc + item.totalPrice;
  }, 0);
}
