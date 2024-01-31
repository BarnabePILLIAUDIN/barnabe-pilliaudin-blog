import webConfig from "@/web/webConfig"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const CommentCard = ({
  comment: {
    content,
    user: { firstName, lastName },
  },
  className,
  ...otherProps
}) => (
  <div
    className={clsx(
      "flex flex-col gap-2 mt-5 border border-black px-5 py-2 rounded",
      className,
    )}
    {...otherProps}
  >
    <div className="flex items-center gap-2">
      <UserCircleIcon width={webConfig.icon.s} height={webConfig.icon.s} />
      <h4 className="text-md font-medium">
        {firstName} {lastName}
      </h4>
    </div>
    <p>{content}</p>
  </div>
)

export default CommentCard
