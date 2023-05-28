CREATE TABLE `project_resources`(
    `project_resource_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_id` BIGINT NOT NULL,
    `resource_id` BIGINT NOT NULL
);
ALTER TABLE
    `project_resources` ADD PRIMARY KEY(`project_resource_id`);
CREATE TABLE `projects`(
    `project_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(255) NOT NULL,
    `project_description` VARCHAR(255) NULL,
    `project_completed` TINYINT(1) NOT NULL DEFAULT '0'
);
ALTER TABLE
    `projects` ADD PRIMARY KEY(`project_id`);
CREATE TABLE `tasks`(
    `task_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `task_description` VARCHAR(255) NOT NULL,
    `task_notes` VARCHAR(255) NOT NULL,
    `task_completed` TINYINT(1) NOT NULL DEFAULT '0',
    `project_id` BIGINT NOT NULL
);
ALTER TABLE
    `tasks` ADD PRIMARY KEY(`task_id`);
CREATE TABLE `resources`(
    `resource_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `resource_name` VARCHAR(255) NOT NULL,
    `resource_description` VARCHAR(255) NULL
);
ALTER TABLE
    `resources` ADD PRIMARY KEY(`resource_id`);
ALTER TABLE
    `resources` ADD UNIQUE `resources_resource_name_unique`(`resource_name`);
ALTER TABLE
    `project_resources` ADD CONSTRAINT `project_resources_resource_id_foreign` FOREIGN KEY(`resource_id`) REFERENCES `resources`(`resource_id`);
ALTER TABLE
    `tasks` ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY(`project_id`) REFERENCES `projects`(`project_id`);
ALTER TABLE
    `project_resources` ADD CONSTRAINT `project_resources_project_id_foreign` FOREIGN KEY(`project_id`) REFERENCES `projects`(`project_id`);