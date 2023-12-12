import { string } from "yup"

export const firstNameValidator = string().min(3).max(255).label("First name")
export const lastNameValidator = string().min(3).max(255).label("Last name")
export const emailValidator = string().email().label("Email")
export const passwordValidator = string()
  .min(8)
  .matches(
    /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u,
    "Must contain: 1 lower & 1 upper letters, 1 digit and 1 spe. char.",
  )
