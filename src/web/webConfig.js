import { ValidationError, boolean, number, object, string } from "yup"

const validationSchema = object({
  api: object({
    url: string().required(),
  }).noUnknown(),
  security: object({
    session: object({
      cookie: object({
        key: string().required(),
        secure: boolean().required(),
      }).noUnknown(),
    }).noUnknown(),
  }).noUnknown(),
  pagination: object({
    limit: number().required(),
  }).noUnknown(),
  icon: object({
    s: number().required(),
    m: number().required(),
    l: number().required(),
  }).noUnknown(),
}).noUnknown()

let webConfig = null

try {
  webConfig = validationSchema.validateSync({
    api: {
      url: process.env.NEXT_PUBLIC__API_URL,
    },
    security: {
      session: {
        cookie: {
          key: "sessionJsonWebToken",
          secure: process.env.NODE_ENV !== "development",
        },
      },
    },
    pagination: {
      limit: 5,
    },
    icon: {
      s: 20,
      m: 30,
      l: 50,
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
