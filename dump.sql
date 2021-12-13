CREATE TABLE "students" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"class_id" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "students_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"class" TEXT NOT NULL UNIQUE,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student_id" integer NOT NULL,
	"submited_at" DATE NOT NULL,
	"answered" bool NOT NULL DEFAULT 'false',
	"score" integer NOT NULL DEFAULT '1',
	"tags" TEXT,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"answered_at" DATE NOT NULL,
	"answer" DATE NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "students" ADD CONSTRAINT "students_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");


ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");

ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "answers" ADD CONSTRAINT "answers_fk1" FOREIGN KEY ("student_id") REFERENCES "students"("id");

INSERT INTO "classes" ("class") VALUES ('T1'), ('T2'), ('T3'), ('T4');
