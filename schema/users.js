const { object, string, boolean, ref, number } = require("yup");

module.exports = {
  store: {
    body: object()
      .shape({
        username: string(50).required("O campo nome e obrigatorio"),
        email: string(255).email().required("O campo email e obrigatorio!"),
        password: string(255).required("O campo senha e obrigatorio").min(6),
        confirmPassword: string(255)
          .required()
          .oneOf([ref("password"), null], "As senhas nao sao iguais!"),
        is_admin: boolean().default(false),
      })
      .noUnknown(),
  },

  login: {
    body: object()
      .shape({
        email: string(255).email().required("O campo email e obrigatorio!"),
        password: string(255).required("O campo senha e obrigatorio"),
      })
      .noUnknown(),
  },

  update: {
    body: object().shape({
      username: string(50),
      email: string(255).email(),
      password: string(255),
      is_admin: boolean().default(false),
    }),
    params: object()
      .shape({
        id: number().required(),
      })
      .noUnknown(),
  },

  delete: {
    params: object()
      .shape({
        id: number().required(),
      })
      .noUnknown(),
  },
};
