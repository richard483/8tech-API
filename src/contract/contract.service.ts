import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import { IContract } from './interface/contract.interface';

@Injectable()
export class ContractService {
  constructor(private contractRepository: ContractRepository) {}

  async create(user: any): Promise<IContract> {
    return this.contractRepository.create(user);
  }
}
