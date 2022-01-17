const { object, string, number } = require("yup");

module.exports = {
  store: {
    body: object()
      .shape({
        type: string("Selecione um metodo!").required(
          "Este campo e obrigatorio"
        ),
        balance: number("Valor invalido!").default(0),
      })
      .noUnknown(),
  },

  update: {
    body: object()
      .shape({
        type: string("Selecione um metodo!"),
        balance: number("Valor invalido!").default(0),
      })
      .noUnknown(),
    params: object().shape({
      id: string().required(),
    }),
  },

  delete: {
    params: object()
      .shape({
        id: string().required(),
      })
      .noUnknown(),
  },
};
