const { users } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

module.exports = {
  store: async (req) => {
    const { email } = req.data;
    try {
      const emailExist = await users.findAll({ where: { email }, raw: true });
      if (emailExist.length) throw new Error("Email ja existe");

      return await users.create(req.data);
    } catch (err) {
      throw err;
    }
  },

  login: async (req) => {
    const { email, password } = req.data;
    try {
      const userLogin = await users.findOne({ where: { email }, raw: true });
      if (!userLogin) throw new Error("Usuario Inexistente");

      const comparePass = bcryptjs.compareSync(password, userLogin.password);
      if (!comparePass) throw new Error("Usuario Inexistente");

      const userLogged = jwt.sign({ userLogin }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      return { userLogged, userLogin };
    } catch (err) {
      throw err;
    }
  },

  index: async (req) => {
    const { id } = req.currentUser.userLogin;
    return await users.findByPk(id);
  },

  update: async (req) => {
    const { userLogin } = req.currentUser;
    const { id } = req.params;
    try {
      if (userLogin.id != id) throw new Error("Usuario não autenticado!");
      return users.update(req.data, { where: { id } });
    } catch (err) {
      throw err;
    }
  },

  delete: async (req) => {
    const { userLogin } = req.currentUser;
    const { id } = req.params;
    try {
      if (userLogin.id != id) throw new Error("Usuario nao autenticado!");
      return users.destroy({ where: { id } });
    } catch (err) {
      throw err;
    }
  },
};
