DROP TABLE IF EXISTS `vet_app`.`main_content`;
CREATE TABLE IF NOT EXISTS `vet_app`.`main_content` (
  `containt_id` varchar(155) NOT NULL,
  `main_title` varchar(255) NOT NULL,
  `author` varchar(155) NOT NULL,
  `author_designation` varchar(255) NOT NULL,
  `date_of_creation` date NOT NULL,
  `date_of_modify` date NOT NULL,
  `content_data` varchar(255) NOT NULL,
  `fk_subhead_id` varchar(255) NOT NULL,
  PRIMARY KEY (`containt_id`),
  KEY `fk_subhead_id` (`fk_subhead_id`(250))
);

ALTER TABLE `vet_app`.`main_content` 
CHANGE COLUMN `containt_id` `content_id` VARCHAR(155) NOT NULL ,
CHANGE COLUMN `main_title` `title` VARCHAR(255) NOT NULL , RENAME TO  `vet_app`.`content` ;


ALTER TABLE `vet_app`.`content` 
CHANGE COLUMN `fk_subhead_id` `fk_section_id` VARCHAR(255) NOT NULL ;

ALTER TABLE `vet_app`.`content` 
ADD CONSTRAINT `fk_ref_section_id`
  FOREIGN KEY (`fk_section_id`)
  REFERENCES `vet_app`.`section` (`section_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  
  ALTER TABLE `vet_app`.`content` 
CHANGE COLUMN `date_of_creation` `date_of_creation` VARCHAR(255) NULL ,
CHANGE COLUMN `date_of_modify` `date_of_modify` VARCHAR(255) NULL ;

ALTER TABLE `vet_app`.`content` 
ADD COLUMN `fk_chapter_id` VARCHAR(255) NULL AFTER `fk_section_id`;

ALTER TABLE `vet_app`.`content` 
ADD CONSTRAINT `fk_ref_chapter_id_2`
  FOREIGN KEY (`fk_chapter_id`)
  REFERENCES `vet_app`.`chapter` (`chapter_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
