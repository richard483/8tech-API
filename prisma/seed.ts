import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';

const prisma = new PrismaClient();

function hashPassword(password: string) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      email: 'admin@email.com',
      userName: 'Admin',
      password: hashPassword('Admin123_'),
      roles: ['ADMIN', 'USER'],
    },
  });

  const defaultUser = await prisma.user.upsert({
    where: { email: 'default.user@email.com' },
    update: {},
    create: {
      email: 'default.user@email.com',
      userName: 'Default User',
      password: hashPassword('User123_'),
      roles: ['USER'],
    },
  });
  console.log({ admin, defaultUser });
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
