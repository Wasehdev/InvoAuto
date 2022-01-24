CREATE TABLE "Tasks" (
  "id" int PRIMARY KEY,
  "title" varchar(45) NOT NULL,
  "description" text(400),
  "actual_hours" varchar(45),
  "estimated_hours" varchar(45),
  "created_at" timestamp,
  "update_at" timestamp,
  "invoice_id" id
);

CREATE TABLE "Invoices" (
  "id" int PRIMARY KEY,
  "description" text(400),
  "billable_hours" float,
  "created_at" timestamp,
  "update_at" timestamp
);

CREATE TABLE "Labels" (
  "id" int PRIMARY KEY,
  "title" varchar(45) NOT NULL,
  "task_id" int
);

CREATE TABLE "Attachment" (
  "id" int PRIMARY KEY,
  "attachment" blob,
  "task_id" int
);

CREATE TABLE "Members" (
  "id" int PRIMARY KEY,
  "name" varchar(45)
);

CREATE TABLE "MembersData" (
  "task_id" int,
  "member_id" int
);

ALTER TABLE "Tasks" ADD FOREIGN KEY ("invoice_id") REFERENCES "Invoices" ("id");

ALTER TABLE "Labels" ADD FOREIGN KEY ("task_id") REFERENCES "Tasks" ("id");

ALTER TABLE "Attachment" ADD FOREIGN KEY ("task_id") REFERENCES "Tasks" ("id");

ALTER TABLE "Tasks" ADD FOREIGN KEY ("id") REFERENCES "MembersData" ("task_id");

ALTER TABLE "Members" ADD FOREIGN KEY ("id") REFERENCES "MembersData" ("member_id");
