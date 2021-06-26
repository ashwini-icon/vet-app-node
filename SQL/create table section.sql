DROP TABLE IF EXISTS `vet_app`.`chapter_subhead`;
CREATE TABLE IF NOT EXISTS `vet_app`.`chapter_subhead` (
  `subhead_id` varchar(155) NOT NULL,
  `subhead_name` varchar(255) NOT NULL,
  `fk_chapter_id` varchar(255) NOT NULL,
  PRIMARY KEY (`subhead_id`),
  KEY `fk_chapter_id` (`fk_chapter_id`(250))
) ;

ALTER TABLE `vet_app`.`chapter_subhead` 
CHANGE COLUMN `subhead_id` `section_id` VARCHAR(155) NOT NULL ,
CHANGE COLUMN `subhead_name` `section_name` VARCHAR(255) NOT NULL , RENAME TO  `vet_app`.`section` ;

ALTER TABLE `vet_app`.`section` 
ADD CONSTRAINT `fk_ref_chapter_id`
  FOREIGN KEY (`fk_chapter_id`)
  REFERENCES `vet_app`.`chapter` (`chapter_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

