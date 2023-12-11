import BaseModel from "@/db/models/baseModel"
import PostModel from "@/db/models/postModel"
import UserModel from "@/db/models/userModel"

class CommentModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
      post: {
        modelClass: PostModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    }
  }
}

export default CommentModel
