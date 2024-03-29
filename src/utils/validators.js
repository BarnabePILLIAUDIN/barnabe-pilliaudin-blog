import { number, string } from "yup"

export const firstNameValidator = string().min(3).max(255).label("First name")
export const lastNameValidator = string().min(3).max(255).label("Last name")
export const emailValidator = string().email().label("Email")
export const passwordValidator = string()
  .min(8)
  .matches(
    /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u,
    "Must contain: 1 lower & 1 upper letters, 1 digit and 1 spe. char.",
  )
export const titleValidator = string().min(10).max(500).label("Title")
export const contentValidator = string().min(10).max(5000).label("Content")
export const idValidator = number().min(1).label("Id")
export const commentValidator = string()
  .min(10)
  .max(500)
  .label("Comment content")
export const pageValidator = number().min(1).default(1).required()
