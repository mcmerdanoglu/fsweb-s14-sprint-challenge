/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("projects").truncate(); // del() ///del'den farkı identity kolonunu da sıfırlaması
  await knex("resources").truncate();
  await knex("tasks").truncate();
  await knex("projects_resources").truncate(); //ResetDb sonrası idlerde sorun olmaması için truncate yöntemi daha delete yöntemine göre daha uygundur.

  const defaultProjects = [
    {
      project_name: "Varolan React projelerine search bar ekle",
      project_description:
        "Axios ile veri çekilen React projelerinde istenen veriyi kolayca çekebilmek için search bar eklenilmesi",
    },
    {
      project_name: "React projelerini responsive dizayna uygun hale getir",
      project_description:
        "React projelerindeki mobil ekranlar uyumsuzluklarını Css kodlarındaki media queryler ile düzelt",
    },
  ];

  const defaultResources = [
    {
      resource_name: "React",
      resource_description: "React documentation page",
    },
    {
      resource_name: "Youtube",
      resource_description: "Adding searh bar in React",
    },
  ];
  const defaultTasks = [
    {
      project_id: 1,
      task_description: "Seach bar için useState hooku oluştur",
      task_notes: "Input özelliklerini form yapısı ile uygula",
    },
    {
      project_id: 1,
      task_description: "Aranan data bulununca yönlendireceği alanı ekle",
      task_notes: "Bulunan favori listesine ekle",
    },
    {
      project_id: 2,
      task_description: "Css dosyasında media queryleri belirle.",
      task_notes: "İlk önce Wireframeler ile responsive tasarımları oluştur",
    },
  ];

  //many-to-many ilişkisi
  const defaultProjects_Resources = [
    { project_id: 1, resource_id: 1 },
    { project_id: 2, resource_id: 1 },
    { project_id: 2, resource_id: 2 },
  ];
  await knex("projects").insert(defaultProjects);
  await knex("resources").insert(defaultResources);
  await knex("tasks").insert(defaultTasks);
  await knex("projects_resources").insert(defaultProjects_Resources);
};
