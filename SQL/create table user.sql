DROP TABLE IF EXISTS `vet_app`.`users`;
CREATE TABLE IF NOT EXISTS `vet_app`.`users` (
  `unique_id` varchar(155) NOT NULL,
  `full_name` varchar(155) NOT NULL,
  `email_id` varchar(155) NOT NULL,
  `password` varchar(155) NOT NULL,
  `phone` varchar(155) NOT NULL,
  `role` int(155) DEFAULT NULL,
  PRIMARY KEY (`unique_id`)
);