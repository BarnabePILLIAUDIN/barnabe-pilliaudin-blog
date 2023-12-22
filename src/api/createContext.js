import apiConfig from "@/api/apiConfig"
import BaseModel from "@/db/models/BaseModel"
import CommentModel from "@/db/models/CommentModel"
import UserModel from "@/db/models/UserModel"
import PostModel from "@/db/models/PostModel"

import knex from "knex"

export const createContext = ({ req, res, next, requestId }) => {
  const send = (result, meta = {}, code = 200) => {
    res.status(code)
    res.send({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  }
  const db = knex(apiConfig.db)

  BaseModel.knex(db)

  return {
    requestId,
    req,
    res,
    next,
    send,
    db,
    models: {
      UserModel,
      PostModel,
      CommentModel,
    },
  }
}
