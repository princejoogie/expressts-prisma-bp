/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const res = await prisma.user.findMany({
    include: {
      Profile: true,
    },
  });
  console.log(res);
};

main().catch(console.error);
