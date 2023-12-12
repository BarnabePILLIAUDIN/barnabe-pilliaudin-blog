import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class PostModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongToOneRelation,
        join: {
          from: "posts.userId",
          to: "user.id",
        },
      },
    }
  }
}

export default PostModel
