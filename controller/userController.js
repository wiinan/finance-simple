const userServices = require("../services/userServices");

class Users {
  async store(req, res) {
    try {
      const userCreate = await userServices.store(req);
      res.status(200).json({ "usuario criado": userCreate });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async login(req, res) {
    try {
      const userCreate = await userServices.login(req);
      res.status(200).json({ "usuario criado": userCreate });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async index(req, res) {
    try {
      const userCreate = await userServices.index(req);
      res.status(200).json(userCreate);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async update(req, res) {
    try {
      await userServices.update(req);
      res.status(200).json({ "usuario editado": req.data });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await userServices.delete(req);
      res.status(200).json({ "usuario removido": req.params });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

module.exports = new Users();
