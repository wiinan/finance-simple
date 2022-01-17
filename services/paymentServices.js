const { payments } = require("../models");

module.exports = {
  store: async (req) => {
    const { id } = req.currentUser.userLogin;
    try {
      if (!id) throw new Error("Conta nao encontrada!");
      return await payments.create({ user_id: id, ...req.data });
    } catch (err) {
      throw err;
    }
  },
  index: async (req) => {
    const { id } = req.currentUser.userLogin;
    try {
      return await payments.findAll({ where: { user_id: id } });
    } catch (err) {
      throw err;
    }
  },
  update: async (req) => {
    const { id } = req.params;
    const { userLogin } = req.currentUser;
    try {
      const payment = await payments.findByPk(id, { raw: true });

      if (userLogin.id != payment.user_id) throw new Error("Usuario nao autenticado!");
      if (!payment) throw new Error("Conta nao encontrada!");

      const paymentBucket = parseFloat(req.data.balance) + parseFloat(payment.balance);
      console.log(paymentBucket)
      return await payments.update({...req.data, balance: paymentBucket }, { where: { id } });
    } catch (err) {
      throw err;
    }
  },
  delete: async (req) => {
    const { id } = req.params;
    const { userLogin } = req.currentUser;
    try {
      const payment = await payments.findByPk(id, { raw: true });

      if (userLogin.id != payment.user_id) throw new Error("Usuario nao autenticado!");
      if (!payment) throw new Error("Conta nao encontrada!");

      return await payments.destroy({ where: { id } });
    } catch (err) {
      throw err;
    }
  },
};
