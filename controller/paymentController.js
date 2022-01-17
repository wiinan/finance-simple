const paymentService = require("../services/paymentServices");

class Payment {
  async store(req, res) {
    try {
      const paymentCreate = await paymentService.store(req);
      res.status(200).json({ "Pagamento Criado": paymentCreate });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async index(req, res) {
    try {
      const getPayment = await paymentService.index(req);
      res.status(200).json({ getPayment });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async update(req, res) {
    try {
      await paymentService.update(req);
      res.status(200).json({ "Valor Atualizada": req.data });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async delete(req, res) {
    try {
      await paymentService.delete(req);
      res.status(200).json({ "Conta Deletada": req.params });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = new Payment();
