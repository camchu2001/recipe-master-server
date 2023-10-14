/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id,category_id]` on the table `recipes_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,recipe_id]` on the table `users_recipes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipes_categories_recipe_id_category_id_key" ON "recipes_categories"("recipe_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_recipes_user_id_recipe_id_key" ON "users_recipes"("user_id", "recipe_id");
