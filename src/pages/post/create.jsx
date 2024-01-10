import { contentValidator, titleValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import ForbiddenMessage from "@/web/components/ui/ForbiddenMessage"
import FormField from "@/web/components/ui/FormField"
import addPost from "@/web/services/addPost"
import webConfig from "@/web/webConfig"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"
const initialValues = {
  title: "",
  content: "",
}
const formFields = [
  {
    name: "title",
    type: "text",
    placeholder: "Title",
    label: "What's your post title?",
  },
  {
    name: "content",
    as: "textarea",
    rows: 10,
    placeholder: "Content",
    label: "What's your post content?",
  },
]
const validationSchema = object({
  title: titleValidator.required("Title is required"),
  content: contentValidator.required("Content is required"),
})
const CreatePost = () => {
  const { session } = useSession()
  const router = useRouter()

  if (!session || !session.isAuthor) {
    return <ForbiddenMessage message="You are not allowed to create a post " />
  }

  const { mutateAsync } = useMutation({
    mutationFn: ({ title, content }) =>
      addPost(
        title,
        content,
        localStorage.getItem(webConfig.security.session.cookie.key),
      ),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
    router.push("/")
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-5 mx-12">
        {formFields.map((fieldData, key) => (
          <FormField {...fieldData} key={key} />
        ))}
        <Button type="submit">Create post</Button>
      </Form>
    </Formik>
  )
}

export default CreatePost
