/* eslint-disable no-console */
import { prisma } from "../lib/prisma";

const getPostInfo = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: "princejoogie@gmail.com",
    },
  });
  console.log({ user });

  if (user) {
    const post = await prisma.post.create({
      data: {
        content: "Hello World",
        authorId: user.id,
      },
    });
    console.log({ post });
  }
};

getPostInfo().catch(console.error);
