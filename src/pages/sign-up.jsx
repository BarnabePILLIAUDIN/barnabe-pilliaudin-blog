import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Form, Formik } from "formik"
import Link from "next/link"
import * as yup from "yup"

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}
const validationSchema = yup.object({
  firstName: firstNameValidator.required("First name is required"),
  lastName: lastNameValidator.required("Last name is required"),
  email: emailValidator.required("Email is required"),
  password: passwordValidator.required("Password is required"),
  _confirmPassword: passwordValidator
    .required("You need to confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .label("Confirm password"),
})
const formFields = [
  {
    name: "firstName",
    type: "text",
    placeholder: "First name",
    label: "What's your first name?",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last name",
    label: "What's your last name?",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "What's your email?",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "What's your password?",
  },
  {
    name: "_confirmPassword",
    type: "password",
    placeholder: "Confirm password",
    label: "Confirm your password",
  },
]
const SignUp = () => {
  const { mutateAsync, isSuccess, isLoading } = useMutation({
    mutationFn: (values) => {
      axios.post("/api/users", values)
    },
  })
  const handleSubmit = async ({ _confirmPassword, ...values }) => {
    await mutateAsync(values)
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center py-5 uppercase">sign up</h2>
      {isSuccess ? (
        <div className=" mx-5 py-2 px-5 mt-5">
          <Alert variant="info">
            Your account has been created. You can now sign in.
          </Alert>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          className="block mx-auto w-screen "
        >
          <Form className="flex justify-center w-screen ">
            <div className="flex flex-col gap-4 w-96 border-2 border-black p-5 rounded-lg">
              {formFields.map((field) => (
                <FormField key={field.name} {...field} />
              ))}
              <Button type="submit" variant="primary" className="mt-3">
                {isLoading ? "Loading" : "Create account"}
              </Button>
            </div>
          </Form>
        </Formik>
      )}
      <div className="mt-7 flex justify-center">
        <Link
          href="/sign-in"
          className="text-center underline font-semibold text-lg mx-10 pb-4"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </>
  )
}

export default SignUp
