-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL,
    "genre" "Genre" NOT NULL,
    "day" "Days" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);
