import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import { IContract } from './interface/contract.interface';
import { ContractHelper } from './contract.helper';
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
      const constdata: IContract = {
        id: 'string',
        userId: 'string',
        jobId: 'string',
        title: 'string',
        description: 'string',
        template: 'string',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // docs.html(template.template);
      await this.contractHelper.createPdf(
        await this.contractRepository.get(contractId),
      );
      // this.contractHelper.createPdf(constdata);
      console.log('generate success');
    } catch (error) {
      console.log('generate error');
      console.log(error);
    }
  }
}
