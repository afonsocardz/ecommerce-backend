/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `cart_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_products_productId_userId_key" ON "cart_products"("productId", "userId");
