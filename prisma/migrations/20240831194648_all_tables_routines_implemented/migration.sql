/*
  Warnings:

  - You are about to drop the `Routine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Routine";

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
CREATE TABLE "Routine_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Routine_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine_excercise" (
    "id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "routine_id" INTEGER NOT NULL,

    CONSTRAINT "Routine_excercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "video_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle_exercise" (
    "id" SERIAL NOT NULL,
    "muscle_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "Muscle_exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "routine" ADD CONSTRAINT "routine_routine_type_id_fkey" FOREIGN KEY ("routine_type_id") REFERENCES "Routine_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine_excercise" ADD CONSTRAINT "Routine_excercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine_excercise" ADD CONSTRAINT "Routine_excercise_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muscle_exercise" ADD CONSTRAINT "Muscle_exercise_muscle_id_fkey" FOREIGN KEY ("muscle_id") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muscle_exercise" ADD CONSTRAINT "Muscle_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
