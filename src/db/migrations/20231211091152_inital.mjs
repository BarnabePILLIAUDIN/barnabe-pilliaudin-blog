export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable().unique()
    table.text("hashedPassword").notNullable()
    table.text("salt").notNullable()
    table.boolean("isAdmin").defaultTo(false)
    table.boolean("isActive").defaultTo(true)
    table.timestamps(true, true)
  })

  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.timestamps(true, true)
  })

  await db.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.integer("postId").notNullable()
    table
      .foreign("postId")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("comments")
  await db.schema.dropTable("posts")
  await db.schema.dropTable("users")
}
