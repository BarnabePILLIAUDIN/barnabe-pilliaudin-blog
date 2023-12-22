export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.boolean("isActive").defaultTo(true)
    table.boolean("isAuthor").defaultTo(false)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("isActive")
    table.dropColumn("isAuthor")
  })
}
