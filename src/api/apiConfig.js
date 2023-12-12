import { ValidationError, object, string } from "yup"
import knexfile from "../../knexfile.mjs"

const validationSchema = object({
  db: object({
    client: string().oneOf(["pg"]).required(),
    connection: string().required(),
  }).noUnknown(),
  security: object({
    jwt: object({
      secret: string().required(),
      expiresIn: string().required(),
    }).noUnknown(),
  }).noUnknown(),
}).noUnknown()
let apiConfig = null

try {
  apiConfig = validationSchema.validateSync({
    db: knexfile,
    security: {
      jwt: {
        secret: process.env.SECURITY__JWT__JWT_SECRET,
        expiresIn: "1d",
      },
    },
  })
} catch (error) {
  if (!(error instanceof ValidationError)) {
    throw error
  }

  // eslint-disable-next-line no-console
  console.error(
    `Error: Missing values for api config\n\t${error.errors.join(
      "\n\t",
    )}`.trim(),
  )
  process.exit(1)
}

export default apiConfig
