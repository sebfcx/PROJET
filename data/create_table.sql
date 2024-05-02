BEGIN;

DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" text NOT NULL,
  "lastname" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;