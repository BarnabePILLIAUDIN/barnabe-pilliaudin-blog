import BaseModel from "@/db/models/BaseModel"
import { randomBytes, pbkdf2 } from "node:crypto"
import { promisify } from "node:util"

const pbkdf2Async = promisify(pbkdf2)

class UserModel extends BaseModel {
  static tableName = "users"

  static async hashPassword(password, salt = randomBytes(128).toString("hex")) {
    const hashedPassword = (
      await pbkdf2Async(password, salt, 1_000_000, 256, "sha512")
    ).toString("hex")

    return { hashedPassword, salt }
  }
}

export default UserModel
