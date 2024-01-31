import webConfig from "@/web/webConfig"
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
          <UserCircleIcon width={webConfig.icon.l} height={webConfig.icon.l} />
          <h4 className="text-lg font-medium">
            {firstName} {lastName}
          </h4>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-medium">{comments.length} </h4>
            <ChatBubbleBottomCenterTextIcon
              width={webConfig.icon.m}
              height={webConfig.icon.m}
            />
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-medium">{views} </h4>
            <EyeIcon width={webConfig.icon.m} height={webConfig.icon.m} />
          </div>
        </div>
      </div>
    </article>
  </Link>
)

export default PostCard
