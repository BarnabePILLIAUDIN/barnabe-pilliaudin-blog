import { contentValidator, titleValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import ForbiddenMessage from "@/web/components/ui/ForbiddenMessage"
import FormField from "@/web/components/ui/FormField"
import getPostById from "@/web/services/posts/getPostById"
import updatePost from "@/web/services/posts/updatePost"
import webConfig from "@/web/webConfig"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"

// Even though SSR is not necessary for this page it the only way I found not to have initialValues to ""
export const getServerSideProps = async ({ query: { postId } }) => {
  const {
    data: {
      result: [post],
    },
  } = await getPostById(postId)

  return {
    props: {
      post,
    },
  }
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
const EditPostPage = ({ post: { id, title, content } }) => {
  const { session } = useSession()
  const router = useRouter()
  const initialValues = {
    title: title ?? "",
    content: content ?? "",
  }
  const handleEditPost = useCallback(
    async ({ title: newTitle, content: newContent }) => {
      const token = localStorage.getItem(webConfig.security.session.cookie.key)
      await updatePost(
        { title: newTitle, content: newContent, id },
        token,
        router,
      )
      router.push("/")
    },
    [],
  )

  if (!session || !session.isAuthor) {
    return <ForbiddenMessage message="You are not allowed to edit a post " />
  }

  return (
    <div>
      <h2 className="font-extrabold text-4xl text-center mb-7">Modify post</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleEditPost}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-5 mx-12">
          {formFields.map((fieldData, key) => (
            <FormField
              {...fieldData}
              defaultValue={initialValues[Object.keys(initialValues)[key]]}
              key={key}
            />
          ))}
          <Button type="submit">Update post</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditPostPage
