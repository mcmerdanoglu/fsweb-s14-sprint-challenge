/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (table) => {
      table.increments("project_id");
      table.string("project_name").notNullable();
      table.string("project_description");
      table.boolean("project_completed").defaultTo(false);
    })
    .createTable("resources", (t) => {
      t.increments("resource_id");
      t.string("resource_name").notNullable().unique();
      t.string("resource_description");
    })
    .createTable("tasks", (t) => {
      t.increments("task_id");
      t.string("task_description").notNullable();
      t.string("task_notes");
      t.boolean("task_completed").defaultTo(false);
      //ilişki bilgisi buradan başlıyor
      t.integer("project_id")
        .notNullable()
        .references("project_id") //ilişki kurulacak kolon adı
        .inTable("projects") //ilişki kurulacak tablo adı.
        .onDelete("CASCADE") //RESTRICT
        .onUpdate("CASCADE"); //RESTRICT silinmesini yasaklamak için kullanılır. CASCADE ise ilgili datanınn ilişkili diğer tablolarda da aynı anda değişmesi için kullanılır.
    })
    .createTable("projects_resources", (t) => {
      t.increments("project_resource_id");
      t.integer("project_id")
        .notNullable()
        .references("project_id") //ilişki kurulacak kolon adı
        .inTable("projects") //ilişki kurulacak tablo adı.
        .onDelete("CASCADE") //RESTRICT
        .onUpdate("CASCADE"); //RESTRICT - Ayrıca update kısmı burda gereksiz çünkü zaten id manuel değil otomatik olarak artıyor.
      t.integer("resource_id")
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema //Normalde sıralamanın en ilişki olan tablodan en az ilişkili olana doğru sıralanması gerekir. Fakat bu proje için önemli değil.
    .dropTableIfExists("projects_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
