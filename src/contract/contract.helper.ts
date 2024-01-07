import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { launch } from 'puppeteer';
import { rm } from 'fs';
import { join } from 'path';
import { Contract } from '@prisma/client';

@Injectable()
export class ContractHelper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async createPdf(contractData: Contract) {
    const { template, customField, ...data } = contractData;

    if (customField) {
      // splitting customField string into array
      const fieldList = customField.split(';').filter((field) => field);

      // converting array to object
      fieldList.forEach((field) => {
        const [key, value] = field.split('=');
        data[key] = value;
      });
    }

    const templates = compile(template);
    const html = templates(data);
    const pdfPath = join(
      process.cwd(),
      '/src/contract/temp/',
      `${data.id}.pdf`,
    );

    const browser = await launch({
      args: ['--no-sandbox'],
      // #DEBUG : comment the below line for running locally
      executablePath: '/usr/bin/chromium',
      headless: true,
    });
    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0',
    });
    // await page.pdf({ path: pdfPath, format: 'A4' });
    await page.pdf({ path: pdfPath });
    await browser.close();
  }

  removeFile(path) {
    rm(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('#removeFile success');
      }
    });
  }
}
