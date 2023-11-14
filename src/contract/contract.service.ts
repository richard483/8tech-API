import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import { IContract } from './interface/contract.interface';
import { ContractHelper } from './contract.helper';
import { join } from 'path';
@Injectable()
export class ContractService {
  constructor(
    private contractRepository: ContractRepository,
    private contractHelper: ContractHelper,
  ) {}

  async create(user: any): Promise<IContract> {
    return this.contractRepository.create(user);
  }

  async generate(contractId) {
    try {
      await this.contractHelper.createPdf(
        await this.contractRepository.get(contractId),
      );
      console.log('#generate success');
    } catch (error) {
      console.log('#generate error caused by: ', error);
    }
  }

  removeFile(fileName) {
    this.contractHelper.removeFile(
      join(process.cwd(), '/src/contract/temp/', `${fileName}.pdf`),
    );
  }
}
