import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';

const prisma = new PrismaClient();

function hashPassword(password: string) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

async function users() {
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
      description: 'default user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02', '04'],
    },
  });
  const notADefaultUser = await prisma.user.upsert({
    where: { email: 'notADefault.user@email.com' },
    update: {},
    create: {
      email: 'notADefault.user@email.com',
      userName: 'notADefault User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'notADefault user description that being created by seed.ts',
      previousWorkplaceId: ['01'],
    },
  });
  const mariaMarionetteUser = await prisma.user.upsert({
    where: { email: 'mariaMarionette.user@email.com' },
    update: {},
    create: {
      email: 'mariaMarionette.user@email.com',
      userName: 'mariaMarionette User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description:
        'mariaMarionette user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02', '03', '04'],
    },
  });
  const mikaUser = await prisma.user.upsert({
    where: { email: 'mika.user@email.com' },
    update: {},
    create: {
      email: 'mika.user@email.com',
      userName: 'mika User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'mika user description that being created by seed.ts',
      previousWorkplaceId: ['02', '03', '04'],
    },
  });
  const sonnyUser = await prisma.user.upsert({
    where: { email: 'sonny.user@email.com' },
    update: {},
    create: {
      email: 'sonny.user@email.com',
      userName: 'sonny User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'sonny user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02'],
    },
  });
  const ennaUser = await prisma.user.upsert({
    where: { email: 'enna.user@email.com' },
    update: {},
    create: {
      email: 'enna.user@email.com',
      userName: 'enna User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'enna user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02', '03'],
    },
  });
  const satoruUser = await prisma.user.upsert({
    where: { email: 'satoru.user@email.com' },
    update: {},
    create: {
      email: 'satoru.user@email.com',
      userName: 'satoru User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'satoru user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02', '03'],
    },
  });
  const eyePatchUser = await prisma.user.upsert({
    where: { email: 'eyePatch.user@email.com' },
    update: {},
    create: {
      email: 'eyePatch.user@email.com',
      userName: 'eyePatch User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'eyePatch user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02', '03'],
    },
  });
  const ricatUser = await prisma.user.upsert({
    where: { email: 'ricat.user@email.com' },
    update: {},
    create: {
      email: 'ricat.user@email.com',
      userName: 'ricat User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'ricat user description that being created by seed.ts',
      previousWorkplaceId: ['01', '02', '03'],
    },
  });

  console.log(
    await [
      admin,
      defaultUser,
      notADefaultUser,
      mariaMarionetteUser,
      mikaUser,
      sonnyUser,
      ennaUser,
      satoruUser,
      eyePatchUser,
      ricatUser,
    ].map(async (user) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          previousWorkplaceCount: user.previousWorkplaceId.length,
        },
      });
    }),
  );
}

async function companies() {
  const nijisanji = await prisma.company.upsert({
    where: { id: '01' },
    update: {},
    create: {
      name: 'Nijisanji Anycolor',
      description:
        'Nijisanji is a VTuber agency under Ichikara Inc. While the company is based in Japan, it also has branches in China, Indonesia, South Korea, and India.',
    },
  });

  const hololive = await prisma.company.upsert({
    where: { id: '02' },
    update: {},
    create: {
      name: 'Hololive',
      description:
        'Hololive is a group of virtual reality YouTubers created by Cover Corps. Where each person is represented as a 2D character and performs live using a model created using Live2D software.',
    },
  });

  const djarum = await prisma.company.upsert({
    where: { id: '03' },
    update: {},
    create: {
      name: 'Djarum',
      description:
        'Djarum is Indonesia’s third-largest tobacco company, with a 2017 market share of 14.9%. The company was founded on 21 April 1951 by Oei Wie Gwan in Kudus, Central Java.',
    },
  });

  const oreo = await prisma.company.upsert({
    where: { id: '04' },
    update: {},
    create: {
      name: 'Oreo',
      description:
        'Oreo is an American sandwich cookie consisting of two (usually chocolate) wafers with a sweet crème filling. Introduced on March 6, 1912, Oreo is the best selling cookie brand in the United States.',
    },
  });

  console.log({
    nijisanji,
    hololive,
    djarum,
    oreo,
  });
}

async function main() {
  await companies();
  await users();
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
