import webConfig from "@/web/webConfig"
import { QueryBuilder } from "objection"

class BaseQueryBuilder extends QueryBuilder {
  page(page) {
    return this.limit(webConfig.pagination.limit).offset(
      (page - 1) * webConfig.pagination.limit,
    )
  }
}

export default BaseQueryBuilder
