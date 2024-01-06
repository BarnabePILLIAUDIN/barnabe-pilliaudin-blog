import { commentValidator } from "@/utils/validator"
import CommentCard from "@/web/components/comments/CommentCard"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import addComment from "@/web/services/addComment"
import webConfig from "@/web/webConfig"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { object } from "yup"

const initialValues = {
  content: "",
}
const validationSchema = object({
  content: commentValidator.required("A comment can't be empty"),
})
const CommentSection = ({ comments, postId }) => {
  const { mutateAsync } = useMutation({
    mutationFn: (content) =>
      addComment(
        postId,
        localStorage.getItem(webConfig.security.session.cookie.key),
        content,
      ),
  })
  const handleSubmit = async ({ content }) => {
    const {
      data: {
        result: [comment],
      },
    } = await mutateAsync(content)
    comments.unshift(comment)
  }

  return (
    <section className="mt-5">
      <h3 className=" font-medium text-3xl">Comments</h3>
      <div className="flex items-center gap-2">
        <h4 className="text-md font-medium">{comments.length} </h4>
        <ChatBubbleBottomCenterTextIcon width={20} height={20} />
      </div>
      <div>
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
      {comments.map((comment) => (
        <CommentCard key={`${comment.id}`} comment={comment} />
      ))}
    </section>
  )
}
export default CommentSection
