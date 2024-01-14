import { useSession } from "@/web/components/SessionContext"
import Legend from "@/web/components/my-account/Legend"
import getUserStats from "@/web/services/users/getUserStats"
import webConfig from "@/web/webConfig"
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentMinusIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

const MyStats = ({ ...props }) => {
  const [myStats, setMyStats] = useState({
    posts: [],
    postCount: 0,
    commentCount: 0,
  })
  const { session: user } = useSession()
  useEffect(() => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    ;(async () => {
      const result = await getUserStats(token)
      const {
        data: {
          result: [{ postCount, commentCount, postViews }],
        },
      } = result
      setMyStats({ postCount, commentCount, postViews })
    })()
  }, [])

  return (
    <div {...props}>
      <h3 className="text-center font-bold text-2xl">Your stats</h3>
      <div className="flex flex-row items-center gap-3 justify-center mt-4">
        <div className="flex flex-row items-center gap-1">
          <ChatBubbleBottomCenterTextIcon width={30} height={30} />
          <h3 className="text-2xl font-bold">{myStats.commentCount ?? 0}</h3>
        </div>
        {user.isAuthor && (
          <>
            <div className="flex flex-row items-center gap-1">
              <DocumentMinusIcon width={30} height={30} />
              <h3 className="text-2xl font-bold">{myStats.postCount ?? 0}</h3>
            </div>
            <div className="flex flex-row items-center gap-1">
              <EyeIcon width={30} height={30} />
              <h3 className="text-2xl font-bold">{myStats.postViews ?? 0}</h3>
            </div>
          </>
        )}
      </div>
      <Legend className="mt-5 ml-5" />
    </div>
  )
}

export default MyStats
