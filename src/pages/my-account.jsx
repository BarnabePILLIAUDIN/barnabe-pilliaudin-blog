import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import updateUser from "@/web/services/updateUser"
import webConfig from "@/web/webConfig"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import Link from "next/link"
import { useCallback } from "react"

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
]
const UserPage = () => {
  const { session: user, signIn } = useSession()
  const { firstName, lastName, id } = user ?? {
    firstName: "",
    lastName: "",
    id: "",
  }
  const { mutateAsync, isSuccess, isLoading } = useMutation({
    mutationFn: (values) => updateUser(id, values),
  })
  const handleSubmit = async ({ firstName, lastName }) => {
    const localStorageToken = localStorage.getItem(
      webConfig.security.session.cookie.key,
    )
    console.log("local storage token", localStorageToken)
    console.log(firstName, lastName)
    const {
      data: {
        result: [{ token }],
      },
    } = await mutateAsync({
      firstName,
      lastName,
      token: localStorageToken,
    })
    signIn(token)
  }

  if (!user) {
    return (
      <div className="w-96 mx-auto flex flex-col text-center gap-3">
        <h2 className="text-xl font-bold">
          You need to sign in to see you account
        </h2>
        <Link href="/sign-in" className="underline text-lg font-medium">
          Go to sign in
        </Link>
        <Link href="/sign-up" className="underline text-lg font-medium">
          Go to sign up
        </Link>
      </div>
    )
  }

  const initialValues = {
    firstName,
    lastName,
  }

  return (
    <>
      <h2 className="text-3xl font-bold mx-4">Hello {firstName}</h2>
      <div className="w-96 mx-auto mt-7">
        <h3 className="text-center font-bold text-2xl mb-5">Modify my infos</h3>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="w-96 mx-auto flex flex-col gap-5">
            {formFields.map((field) => (
              <FormField key={field.name} {...field} />
            ))}
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default UserPage
