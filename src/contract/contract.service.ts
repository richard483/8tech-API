import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import { IContract } from './interface/contract.interface';
import { jsPDF } from 'jspdf';
import template from './assets/template.ts';
@Injectable()
export class ContractService {
  constructor(private contractRepository: ContractRepository) {}

  contract = {
    title: 'Surat Perjanjian Kerja Lepas',
    number: '001',
    worker: {
      name: 'Rizky',
      address: 'Jl. Raya Bogor',
      phone: '08123456789',
    },
  };

  async create(user: any): Promise<IContract> {
    return this.contractRepository.create(user);
  }
  // hard hard coded here for testing

  async generate() {
    const docs = new jsPDF();
    try {
      docs.html(template.template);
      docs.save('contract.pdf');
      console.log('generate success');
    } catch (error) {
      console.log('generate error');
      console.log(error);
    }
  }
}
