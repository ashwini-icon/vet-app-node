DROP TABLE IF EXISTS `vet_app`.`chapter_head`;
CREATE TABLE IF NOT EXISTS `vet_app`.`chapter_head` (
  `chapter_id` varchar(155) NOT NULL,
  `chapter_name` varchar(155) NOT NULL,
  PRIMARY KEY (`chapter_id`)
);

ALTER TABLE `vet_app`.`chapter_head` 
RENAME TO  `vet_app`.`chapter` ;
