-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "jersey" TEXT NOT NULL,
    "pos" TEXT NOT NULL,
    "heightFeet" TEXT NOT NULL,
    "heightInches" TEXT NOT NULL,
    "weightPounds" TEXT NOT NULL,
    "dateOfBirthUTC" TEXT NOT NULL,
    "yearsPro" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
