import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { CreateProductDto } from 'src/product/product.dto';
const prisma = new PrismaClient();

function productsFactory() {
  const QTY = 20;
  const products: CreateProductDto[] = [];
  for (let x = 0; x < QTY; x++) {
    products.push({
      description: faker.lorem.words(8),
      imageUrl: faker.image.urlLoremFlickr(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 100, max: 2500 }),
    });
  }
  return products;
}

async function main() {
  const hasProducts = await prisma.product.count();
  if (hasProducts === 0) {
    await prisma.product.createMany({
      data: productsFactory(),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
