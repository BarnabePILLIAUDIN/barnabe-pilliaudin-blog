import {
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"

import Link from "next/link"

const PostCard = ({
  post: {
    title,
    user: { firstName, lastName },
    id,
    comments,
    views,
  },
  className,
  ...otherProps
}) => (
  <Link
    href={`/post/${id}`}
    className={clsx("  border-y-2 border-black py-2 px-2 mx-3", className)}
    {...otherProps}
  >
    <article>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="flex items-center mt-2 justify-between mr‡-2">
        <div className="flex items-center gap-5">
          <UserCircleIcon width={50} height={50} />
          <h4 className="text-lg font-medium">
            {firstName} {lastName}
          </h4>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-medium">{comments.length} </h4>
            <ChatBubbleBottomCenterTextIcon width={30} height={30} />
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-medium">{views} </h4>
            <EyeIcon width={30} height={30} />
          </div>
        </div>
      </div>
    </article>
  </Link>
)

export default PostCard
