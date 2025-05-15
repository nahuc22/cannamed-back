const { Payment } = require("../db");

const savePayment = async ({ id, status, payment_type, orderId, amount, payer_email }) => {
  return await Payment.create({
    id,
    status,
    payment_type,
    orderId,
    amount,
    payer_email,
  });
};

module.exports = {
  savePayment,
};