import { useSession } from "@/web/components/SessionContext"
import webConfig from "@/web/webConfig"
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentMinusIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"

const Legend = ({ className, ...othersProps }) => {
  const { session: user } = useSession()

  return (
    <div className={clsx(className, "flex flex-col gap-2")} {...othersProps}>
      <div className="flex flex-row items-center gap-2">
        <ChatBubbleBottomCenterTextIcon width={30} height={30} />
        <p>Number of comment you created</p>
      </div>
      {user.isAuthor && (
        <>
          <div className="flex flex-row items-center gap-2">
            <DocumentMinusIcon
              width={webConfig.icon.m}
              height={webConfig.icon.m}
            />
            <p>Number of posts you created</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <EyeIcon width={webConfig.icon.m} height={webConfig.icon.m} />
            <p>Number of views on your posts</p>
          </div>
        </>
      )}
    </div>
  )
}
export default Legend
