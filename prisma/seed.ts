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
      username: 'Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      password: hashPassword('Admin123_'),
      roles: ['ADMIN', 'USER'],
    },
  });
  const recruiter = await prisma.user.upsert({
    where: { email: 'recruiter@email.com' },
    update: {},
    create: {
      email: 'recruiter@email.com',
      username: 'Recruiter User',
      firstName: 'Recruiter',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER', 'RECRUITER'],
      description: 'default user description that being created by seed.ts',
      companyId: await prisma.company
        .findFirst({
          where: {
            name: 'Nijisanji Anycolor',
          },
        })
        .then((company) => company.id),
    },
  });
  const richardWilliam = await prisma.user.upsert({
    where: { email: 'richard.william483@gmail.com' },
    update: {},
    create: {
      email: 'richard.william483@gmail.com',
      username: 'richard__uwu',
      firstName: 'Richard',
      lastName: 'William',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'default richard description that being created by seed.ts',
    },
  });
  const defaultUser = await prisma.user.upsert({
    where: { email: 'default.user@email.com' },
    update: {},
    create: {
      email: 'default.user@email.com',
      username: 'Default User',
      firstName: 'Default',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'default user description that being created by seed.ts',
    },
  });
  const notADefaultUser = await prisma.user.upsert({
    where: { email: 'notADefault.user@email.com' },
    update: {},
    create: {
      email: 'notADefault.user@email.com',
      username: 'notADefault User',
      firstName: 'notADefault',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'notADefault user description that being created by seed.ts',
    },
  });
  const mariaMarionetteUser = await prisma.user.upsert({
    where: { email: 'mariaMarionette.user@email.com' },
    update: {},
    create: {
      email: 'mariaMarionette.user@email.com',
      username: 'mariaMarionette User',
      firstName: 'mariaMarionette',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description:
        'mariaMarionette user description that being created by seed.ts',
    },
  });
  const mikaUser = await prisma.user.upsert({
    where: { email: 'mika.user@email.com' },
    update: {},
    create: {
      email: 'mika.user@email.com',
      username: 'mika User',
      firstName: 'mika',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'mika user description that being created by seed.ts',
    },
  });
  const sonnyUser = await prisma.user.upsert({
    where: { email: 'sonny.user@email.com' },
    update: {},
    create: {
      email: 'sonny.user@email.com',
      username: 'sonny User',
      firstName: 'sonny',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'sonny user description that being created by seed.ts',
    },
  });
  const ennaUser = await prisma.user.upsert({
    where: { email: 'enna.user@email.com' },
    update: {},
    create: {
      email: 'enna.user@email.com',
      username: 'enna User',
      firstName: 'enna',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'enna user description that being created by seed.ts',
    },
  });
  const satoruUser = await prisma.user.upsert({
    where: { email: 'satoru.user@email.com' },
    update: {},
    create: {
      email: 'satoru.user@email.com',
      username: 'satoru User',
      firstName: 'satoru',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'satoru user description that being created by seed.ts',
    },
  });
  const eyePatchUser = await prisma.user.upsert({
    where: { email: 'eyePatch.user@email.com' },
    update: {},
    create: {
      email: 'eyePatch.user@email.com',
      username: 'eyePatch User',
      firstName: 'eyePatch',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'eyePatch user description that being created by seed.ts',
    },
  });
  const ricatUser = await prisma.user.upsert({
    where: { email: 'ricat.user@email.com' },
    update: {},
    create: {
      email: 'ricat.user@email.com',
      username: 'ricat User',
      firstName: 'ricat',
      lastName: 'User',
      password: hashPassword('User123_'),
      roles: ['USER'],
      description: 'ricat user description that being created by seed.ts',
    },
  });

  console.log('Created recruiter user: ', recruiter);
  console.log(
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
    richardWilliam,
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

async function job() {
  const job1 = await prisma.jobVacancy.upsert({
    where: {
      id: '01',
    },
    update: {},
    create: {
      title: 'This is job1 title',
      description: 'This is job1 description for ninisani',
      companyId: await prisma.company
        .findFirst({
          where: {
            name: 'Nijisanji Anycolor',
          },
        })
        .then((company) => company.id),
    },
  });

  const job2 = await prisma.jobVacancy.upsert({
    where: {
      id: '02',
    },
    update: {},
    create: {
      title: 'This is job2 title',
      description: 'This is job2 description for Hololive',
      companyId: await prisma.company
        .findFirst({
          where: {
            name: 'Hololive',
          },
        })
        .then((company) => company.id),
    },
  });

  const job3 = await prisma.jobVacancy.upsert({
    where: {
      id: '03',
    },
    update: {},
    create: {
      title: 'This is job3 title',
      description: 'This is job3 description for Djarum',
      companyId: await prisma.company
        .findFirst({
          where: {
            name: 'Djarum',
          },
        })
        .then((company) => company.id),
    },
  });

  console.log({
    job1,
    job2,
    job3,
  });
}

async function contract() {
  const contract1 = await prisma.contract.upsert({
    where: {
      id: await prisma.user
        .findFirst({
          where: {
            email: 'richard.william483@gmail.com',
          },
        })
        .then((user) => user.id),
    },
    update: {},
    create: {
      paymentRate: 243400,
      template:
        '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n  <meta charset="UTF-8">\r\n    <title>{{title}}</title>\r\n  <style>\r\n    html {\r\n      background-color: rgb(156, 156, 156);\r\n    }\r\n    body {\r\n      size : A4;\r\n      padding: 2cm;\r\n      background-color: white;\r\n    }\r\n    h1 {\r\n      text-align: center;\r\n    }\r\n    h3 {\r\n      text-align: center;\r\n    }\r\n    table {\r\n      margin-top: 0.25cm;\r\n    }\r\n    table tr td {\r\n      padding: 5px;\r\n    }\r\n    .signature {\r\n      display: flex;\r\n      justify-content: space-between;\r\n      margin-top: 2.5cm;\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div>\r\n    <h1>Surat Perjanjian Kerja Lepas</h1>\r\n    <h3>Nomor: {{id}}</h3>\r\n    <p>Yang bertanda tangan di bawah ini:</p>\r\n    <table>\r\n      <tr>\r\n        <td>UserId</td>\r\n        <td>:</td>\r\n        <td>{{userId}}</td>\r\n      </tr>\r\n    </table>\r\n    <p>Selanjutnya disebut sebagai <b>PEKERJA</b></p>\r\n    <p>Dengan ini menyatakan bahwa PEKERJA telah sepakat untuk bekerja pada <b>PERUSAHAAN</b> dengan ketentuan sebagai berikut:</p>\r\n    <table>\r\n      <tr>\r\n        <td>Judul lowongan pekerjaan</td>\r\n        <td>:</td>\r\n        <td>{{title}}</td>\r\n      </tr>\r\n    </table>\r\n    <p>Selanjutnya disebut sebagai <b>PERUSAHAAN</b></p>\r\n    <br>\r\n    <p>PEKERJA akan melakukan pekerjaan <b>{{title}}</b> dengan ketentuan sebagai berikut:</p>\r\n    <table>\r\n      <tr>\r\n        <td>Waktu Kerja</td>\r\n        <td>:</td>\r\n        <td>{{contract.work_time}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Upah</td>\r\n        <td>:</td>\r\n        <td>{{contract.salary}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Periode Pembayaran</td>\r\n        <td>:</td>\r\n        <td>{{contract.payment_method}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Periode Kontrak</td>\r\n        <td>:</td>\r\n        <td>{{contract.periode}}</td>\r\n      </tr>\r\n    </table>\r\n    <p>Demikian surat perjanjian ini dibuat dan ditandatangani oleh kedua belah pihak pada tanggal {{contract.createdAt}}.</p>\r\n    <div class="signature">\r\n      <p>{{contract.worker.name}}</p>\r\n      <p>{{contract.company.name}}</p>\r\n    </div>\r\n    <br>\r\n    <br>\r\n    <table>\r\n      <tr>\r\n        <td>Created date</td>\r\n        <td>:</td>\r\n        <td>{{createdAt}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Description</td>\r\n        <td>:</td>\r\n        <td>{{description}}</td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</body>\r\n</html>',
      description: 'This is contract1 description',
      title: 'This is contract1 title',
      userId: (
        await prisma.user.findFirst({
          where: {
            email: 'richard.william483@gmail.com',
          },
        })
      ).id,
      jobId: (
        await prisma.jobVacancy.findFirst({
          where: {
            title: 'This is job1 title',
          },
        })
      ).id,
    },
  });

  const contract2 = await prisma.contract.upsert({
    where: {
      id: await prisma.user
        .findFirst({
          where: {
            email: 'richard.william483@gmail.com',
          },
        })
        .then((user) => user.id),
    },
    update: {},
    create: {
      paymentRate: 123123123,
      template:
        '<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <title>{{title}}</title>\r\n  <style>\r\n    html {\r\n      background-color: rgb(156, 156, 156);\r\n    }\r\n\r\n    body {\r\n      size: A4;\r\n      padding: 2cm;\r\n      background-color: white;\r\n    }\r\n\r\n    h1 {\r\n      text-align: center;\r\n    }\r\n\r\n    h3 {\r\n      text-align: center;\r\n    }\r\n\r\n    table {\r\n      margin-top: 0.25cm;\r\n    }\r\n\r\n    table tr td {\r\n      padding: 5px;\r\n    }\r\n\r\n    .signature {\r\n      display: flex;\r\n      justify-content: space-between;\r\n      margin-top: 2.5cm;\r\n    }\r\n  </style>\r\n</head>\r\n\r\n<body>\r\n  <div>\r\n    <h1>Surat Perjanjian Kerja Lepas</h1>\r\n    <h3>Nomor: {{id}}</h3>\r\n    <p>Yang bertanda tangan di bawah ini:</p>\r\n    <table>\r\n      <tr>\r\n        <td>UserId</td>\r\n        <td>:</td>\r\n        <td>{{userId}}</td>\r\n      </tr>\r\n    </table>\r\n    <p>Selanjutnya disebut sebagai <b>PEKERJA</b></p>\r\n    <p>Dengan ini menyatakan bahwa PEKERJA telah sepakat untuk bekerja pada <b>PERUSAHAAN</b> dengan ketentuan sebagai\r\n      berikut:</p>\r\n    <table>\r\n      <tr>\r\n        <td>Judul lowongan pekerjaan</td>\r\n        <td>:</td>\r\n        <td>{{title}}</td>\r\n      </tr>\r\n    </table>\r\n    <p>Selanjutnya disebut sebagai <b>PERUSAHAAN</b></p>\r\n    <br>\r\n    <p>PEKERJA akan melakukan pekerjaan <b>{{title}}</b> dengan ketentuan sebagai berikut:</p>\r\n    <table>\r\n      <tr>\r\n        <td>Waktu Kerja</td>\r\n        <td>:</td>\r\n        <td>{{contract.work_time}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Upah</td>\r\n        <td>:</td>\r\n        <td>{{contract.salary}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Periode Pembayaran</td>\r\n        <td>:</td>\r\n        <td>{{contract.payment_method}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Periode Kontrak</td>\r\n        <td>:</td>\r\n        <td>{{contract.periode}}</td>\r\n      </tr>\r\n    </table>\r\n    <p>Demikian surat perjanjian ini dibuat dan ditandatangani oleh kedua belah pihak pada tanggal\r\n      {{contract.createdAt}}.</p>\r\n    <div class="signature">\r\n      <p>{{contract.worker.name}}</p>\r\n      <p>{{contract.company.name}}</p>\r\n    </div>\r\n    <br>\r\n    <br>\r\n    <table>\r\n      <tr>\r\n        <td>Created date</td>\r\n        <td>:</td>\r\n        <td>{{createdAt}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Description</td>\r\n        <td>:</td>\r\n        <td>{{description}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Custom Field 1</td>\r\n        <td>:</td>\r\n        <td>{{customField1}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>Custom Field 2</td>\r\n        <td>:</td>\r\n        <td>{{customField2}}</td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</body>\r\n\r\n</html>',
      description: 'This is contract2 description',
      title: 'This is contract2 title',
      userId: (
        await prisma.user.findFirst({
          where: {
            email: 'richard.william483@gmail.com',
          },
        })
      ).id,
      jobId: (
        await prisma.jobVacancy.findFirst({
          where: {
            title: 'This is job2 title',
          },
        })
      ).id,
    },
  });

  console.log({
    contract1,
    contract2,
  });
}

async function clean() {
  await prisma.rating.deleteMany({});
  await prisma.contract.deleteMany({});
  await prisma.jobVacancy.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});
}

async function main() {
  await clean();
  await companies();
  await users();
  await job();
  await contract();
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
