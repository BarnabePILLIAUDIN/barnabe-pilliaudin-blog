import { emailValidator, passwordValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import createSession from "@/web/services/users/createSession"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import * as yup from "yup"
import Link from "@/web/components/ui/Link"
import SuccessFullSignIn from "@/web/components/SuccessFullSignIn"

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
const SignInPage = () => {
  const { signIn } = useSession()
  const { mutateAsync, isLoading, isSuccess } = useMutation({
    mutationFn: (values) => createSession(values),
  })
  const handleSubmit = async ({ email, password }) => {
    const {
      data: {
        result: [token],
      },
    } = await mutateAsync({ email, password })
    signIn(token)
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center py-5 uppercase">sign in</h2>
      {isSuccess ? (
        <SuccessFullSignIn />
      ) : (
        <>
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
                  {isLoading ? "Loading" : "Sign in"}
                </Button>
              </div>
            </Form>
          </Formik>
          <div className="mt-7 flex justify-center">
            <Link
              href="/sign-up"
              className="text-center underline font-semibold text-lg mx-10 pb-4"
            >
              You do not have an account and want to create on? Sign up
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default SignInPage
