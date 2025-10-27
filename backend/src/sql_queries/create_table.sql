CREATE TABLE `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `username` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_info` (
  `user_info_id` INT NOT NULL AUTO_INCREMENT,
  `gender` ENUM('MALE','FEMALE','OTHER','PREFER_NOT_TO_SAY') NOT NULL,
  `blood_group` VARCHAR(10) NULL,
  `height_cm` INT NULL,
  `weight_kg` FLOAT NULL,
  `profile_picture_url` VARCHAR(255) NULL,
  `user_id` INT NOT NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`user_info_id`),
  UNIQUE INDEX `user_info_user_id_key` (`user_id`),
  CONSTRAINT `user_info_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `user_education` (
  `user_education_id` INT NOT NULL AUTO_INCREMENT,
  `institution` VARCHAR(191) NOT NULL,
  `degree` VARCHAR(191) NOT NULL,
  `field_of_study` VARCHAR(191) NULL,
  `start_date` DATETIME(3) NOT NULL,
  `end_date` DATETIME(3) NULL,
  `gpa` FLOAT NULL,
  `user_id` INT NOT NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`user_education_id`),
  CONSTRAINT `user_education_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `user_education_attachment` (
  `user_education_attachment_id` INT NOT NULL AUTO_INCREMENT,
  `file_url` VARCHAR(255) NOT NULL,
  `file_type` VARCHAR(100) NULL,
  `education_id` INT NOT NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`user_education_attachment_id`),
  CONSTRAINT `user_education_attachment_education_id_fkey` FOREIGN KEY (`education_id`) REFERENCES `user_education` (`user_education_id`) ON DELETE CASCADE
);

CREATE TABLE `user_work_detail` (
  `user_work_detail_id` INT NOT NULL AUTO_INCREMENT,
  `company` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `start_date` DATETIME(3) NOT NULL,
  `end_date` DATETIME(3) NULL,
  `description` TEXT NULL,
  `attachment_url` VARCHAR(255) NULL,
  `attachment_type` VARCHAR(100) NULL,
  `user_id` INT NOT NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`user_work_detail_id`),
  CONSTRAINT `user_work_detail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `task` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `status` ENUM('PENDING','IN_PROGRESS','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `due_date` DATETIME(3) NULL,
  `user_id` INT NOT NULL,
  `created_by` INT NULL,
  `updated_by` INT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`task_id`),
  CONSTRAINT `task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);



INSERT INTO `todo`.`user` 
  (`user_id`, `name`, `username`, `password`, `created_by`, `updated_by`, `created_at`, `is_deleted`) 
VALUES 
  ('1', 'John Doe', 'johndoe', 'password', '1', '1', NOW(), '0');