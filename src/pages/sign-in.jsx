import { emailValidator, passwordValidator } from "@/utils/validator"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import axios from "axios"
import { Form, Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import * as yup from "yup"

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}
const validationSchema = yup.object({
  email: emailValidator.required("Email is required"),
  password: passwordValidator.required("Password is required"),
})
const formFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "What's your email ?",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "What's your password ?",
  },
]
const SignIn = () => {
  const router = useRouter()
  const { signIn } = useSession()
  const handleSubmit = async ({ email, password }) => {
    const {
      data: {
        result: [token],
      },
    } = await axios.post("/api/sessions", { email, password })
    signIn(token)
    router.push("/")
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center py-5 uppercase">sign in</h2>
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
              Sign in
            </Button>
          </div>
        </Form>
      </Formik>
      <div className="mt-7 flex justify-center">
        <Link
          href="/sign-up"
          className="text-center underline font-semibold text-lg mx-10 pb-4"
        >
          You don't have an account and want to create on? Sign up
        </Link>
      </div>
    </>
  )
}

export default SignIn
