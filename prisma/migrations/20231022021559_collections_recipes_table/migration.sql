/*
  Warnings:

  - You are about to drop the `users_recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_recipes" DROP CONSTRAINT "users_recipes_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "users_recipes" DROP CONSTRAINT "users_recipes_user_id_fkey";

-- DropTable
DROP TABLE "users_recipes";

-- CreateTable
CREATE TABLE "collections_recipes" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "collections_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collections_recipes_collection_id_recipe_id_key" ON "collections_recipes"("collection_id", "recipe_id");

-- AddForeignKey
ALTER TABLE "collections_recipes" ADD CONSTRAINT "collections_recipes_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections_recipes" ADD CONSTRAINT "collections_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
