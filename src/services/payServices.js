import { Payment } from "../db.js";

export const savePayment = async ({ id, status, payment_type, orderId, amount, payer_email }) => {
  return await Payment.create({
    id,
    status,
    payment_type,
    orderId,
    amount,
    payer_email,
  });
};
