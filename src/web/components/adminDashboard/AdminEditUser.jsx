import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import updateUser from "@/web/services/users/updateUser"
import webConfig from "@/web/webConfig"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"

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
// For security and confidentiality reasons, the admin can't see nor edit the user's email address.
const AdminEditUser = ({ user: { id, firstName, lastName } }) => {
  const initialValues = { firstName, lastName }
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: (values) => updateUser(values, router, { id }),
  })
  const handleSubmit = async ({ firstName: newFirst, lastName: newLast }) => {
    const localStorageToken = localStorage.getItem(
      webConfig.security.session.cookie.key,
    )
    await mutateAsync({
      firstName: newFirst,
      lastName: newLast,
      token: localStorageToken,
    })
  }

  return (
    <>
      <main className="pb-5 mt-8 mx-5 px-5">
        <section>
          <h2 className="font-extrabold text-4xl ">Edit user</h2>
        </section>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-5 mt-7 text-lg">
            {formFields.map(({ name, type, placeholder, label }) => (
              <FormField
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                label={label}
              />
            ))}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Formik>
      </main>
    </>
  )
}

export default AdminEditUser
