import { commentValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import addComment from "@/web/services/addComment"
import webConfig from "@/web/webConfig"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const initialValues = {
  content: "",
}
const validationSchema = object({
  content: commentValidator.required("A comment can't be empty"),
})
const addCommentForm = ({ postId, ...otherProps }) => {
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: (content) =>
      addComment(
        [
          postId,
          localStorage.getItem(webConfig.security.session.cookie.key),
          content,
        ],
        router,
      ),
  })
  const handleSubmit = async ({ content }) => {
    const result = await mutateAsync(content)

    if (!result.meta.loginAgain) {
      router.push(`/post/${postId}`)
    }
  }

  return (
    <div {...otherProps}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="mt-3">
          <FormField
            name="content"
            placeholder="Content"
            label="Left a comment"
          />
          <Button type="submit" variant="primary" className="mt-3">
            Add a comment
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default addCommentForm
