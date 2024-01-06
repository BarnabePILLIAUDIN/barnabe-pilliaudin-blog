import BaseModel from "@/db/models/BaseModel"
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
    }
  }
}

export default CommentModel
