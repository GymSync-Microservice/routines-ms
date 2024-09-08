-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "routine" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "show" BOOLEAN NOT NULL,
    "genre" "Genre" NOT NULL,
    "day" "Days" NOT NULL,
    "routine_type_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routine_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "routine_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routine_exercise" (
    "id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "routine_id" INTEGER NOT NULL,

    CONSTRAINT "routine_exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "video_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscle" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscle_exercise" (
    "id" SERIAL NOT NULL,
    "muscle_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "muscle_exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "routine" ADD CONSTRAINT "routine_routine_type_id_fkey" FOREIGN KEY ("routine_type_id") REFERENCES "routine_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_exercise" ADD CONSTRAINT "routine_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_exercise" ADD CONSTRAINT "routine_exercise_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muscle_exercise" ADD CONSTRAINT "muscle_exercise_muscle_id_fkey" FOREIGN KEY ("muscle_id") REFERENCES "muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muscle_exercise" ADD CONSTRAINT "muscle_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
