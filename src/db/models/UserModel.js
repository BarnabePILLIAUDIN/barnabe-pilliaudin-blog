import BaseModel from "@/db/models/BaseModel"
import { randomBytes, pbkdf2 } from "node:crypto"
import { promisify } from "node:util"
import jsonwebtoken from "jsonwebtoken"
import apiConfig from "@/api/apiConfig"

const pbkdf2Async = promisify(pbkdf2)

class UserModel extends BaseModel {
  static tableName = "users"

  static async hashPassword(password, salt = randomBytes(128).toString("hex")) {
    const hashedPassword = (
      await pbkdf2Async(password, salt, 1_000_000, 256, "sha512")
    ).toString("hex")

    return { hashedPassword, salt }
  }

  static generateJWT(user) {
    return jsonwebtoken.sign(
      {
        payload: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAuthor: user.isAuthor,
            isAdmin: user.isAdmin,
          },
        },
      },
      apiConfig.security.jwt.secret,
      {
        expiresIn: apiConfig.security.jwt.expiresIn,
      },
    )
  }
}

export default UserModel
