export const prismaContent = (database: string) => {
  return `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = ${database}
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(uuid())

  email    String @unique
  password String

  name String
}

`;
};
