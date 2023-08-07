import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { CreateProductDto } from 'src/product/product.dto';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

function configFactory() {
  async function createEmailConfig() {
    const emailAccount = JSON.stringify(await nodemailer.createTestAccount());
    const hasEmail = await prisma.config.count();
    if (!hasEmail) {
      await prisma.config.create({
        data: {
          key: 'email',
          value: JSON.parse(emailAccount),
        },
      });
    }
  }
  return { createEmailConfig };
}

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

function userFactory() {
  async function userCount() {
    const userCount = await prisma.user.count();
    return userCount;
  }

  async function createUser() {
    if ((await userCount()) === 0) {
      const email = process.env.EMAIL_EXAMPLE;
      console.log(email);
      const password = process.env.STRONG_PASSWORD_EXAMPLE;
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      await prisma.user.create({
        data: {
          email,
          password: hash,
        },
      });
    }
  }

  return { createUser };
}

async function main() {
  const hasProducts = await prisma.product.count();
  if (hasProducts === 0) {
    await prisma.product.createMany({
      data: productsFactory(),
    });
  }
  await userFactory().createUser();

  await configFactory().createEmailConfig();
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
