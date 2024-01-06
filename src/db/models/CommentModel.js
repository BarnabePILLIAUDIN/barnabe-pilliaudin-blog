import BaseModel from "@/db/models/BaseModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"

class CommentModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.HasOneRelation,
        join: {
          from: "users.id",
          to: "comments.userId",
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
