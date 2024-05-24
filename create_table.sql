BEGIN;

DROP TABLE IF EXISTS "member";

CREATE TABLE "member" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" text NOT NULL,
  "lastname" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;