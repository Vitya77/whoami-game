CREATE TABLE `players_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`roomId` integer NOT NULL,
	FOREIGN KEY (`roomId`) REFERENCES `rooms_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `rooms_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `words_table` ADD `roomId` integer NOT NULL REFERENCES rooms_table(id);--> statement-breakpoint
ALTER TABLE `words_table` ADD `creatorId` integer NOT NULL REFERENCES players_table(id);