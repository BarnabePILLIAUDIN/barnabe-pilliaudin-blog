import { ValidationError, boolean, object, string } from "yup"

const validationSchema = object({
  security: object({
    session: object({
      cookie: object({
        key: string().required(),
        secure: boolean().required(),
      }).noUnknown(),
    }).noUnknown(),
  }).noUnknown(),
}).noUnknown()

let webConfig = null

try {
  webConfig = validationSchema.validateSync({
    security: {
      session: {
        cookie: {
          key: "sessionJsonWebToken",
          secure: process.env.NODE_ENV !== "development",
        },
      },
    },
  })
} catch (error) {
  if (!(error instanceof ValidationError)) {
    throw error
  }

  // eslint-disable-next-line no-console
  console.error(
    `Error: Missing values for web config\n\t${error.errors.join(
      "\n\t",
    )}`.trim(),
  )
  process.exit(1)
}

export default webConfig
