export const up = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    // As views can be pretty big, we use bigInt instead of integer
    table.bigint("views").defaultTo(0)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.dropColumn("views")
  })
}
