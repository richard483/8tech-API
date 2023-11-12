import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { launch } from 'puppeteer';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IContract } from './interface/contract.interface';

@Injectable()
export class ContractHelper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  async createPdf(contractData: IContract) {
    // const templates = readFileSync(
    //   join(process.cwd(), '/src/contract/assets/template.html'),
    //   'utf8',
    // );

    // const html = template(data);

    const { template, ...data } = contractData;
    // const data = {
    //   id: 'string',
    //   userId: 'string',
    //   jobId: 'string',
    //   title: 'string',
    //   description: 'string',
    //   template: 'string',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };

    const templates = compile(template);
    const html = templates(data);
    const milis = new Date().getTime();
    // const pdfPath = join(
    //   process.cwd(),
    //   '/src/contract/temp/',
    //   `${data.id}.pdf`,
    // );
    const pdfPath = join(
      process.cwd(),
      '/src/contract/temp/',
      `${data.id}.pdf`,
    );

    const browser = await launch({
      args: ['--no-sandbox'],
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
}
