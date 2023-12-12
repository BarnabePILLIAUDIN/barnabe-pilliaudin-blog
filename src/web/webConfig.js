const webConfig = {
  security: {
    session: {
      cookie: {
        key: "sessionJsonWebToken",
        secure: process.env.NODE_ENV !== "development",
      },
    },
  },
}

export default webConfig
