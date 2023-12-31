import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PaymentService } from '../payment.service';
import { Payment, PaymentStatus } from '@prisma/client';
import { PaymentRepository } from '../payment.repository';
import * as xenditClient from 'xendit-node';

describe('PaymentService', () => {
  let service: PaymentService;
  let reposiotry: DeepMocked<PaymentRepository>;
  let paymentMock: Payment;

  jest.mock('xendit-node');

  const paymentRequestMock = {
    id: 'randomPaymentRequestId',
    externalId: 'randomId',
    amount: 10000,
    status: 'PENDING',
    merchantName: 'Xendit',
    payerEmail: null,
    description: null,
    expiryDate: null,
    invoiceUrl: null,
    availableBanks: null,
    availableRetailOutlets: null,
    availableEwallets: null,
    availableChannels: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    callbackVirtualAccountID: null,
    paymentMethod: {
      type: 'EWALLET',
      ewalletType: 'DANA',
      ewalletChannel: 'DANA',
      ewalletChannelProperties: {
        successReturnUrl: `${process.env.BACK_END_URL}/contract/payment-success/randomContractId`,
      },
      reusability: 'ONE_TIME',
    },
  };

  xenditClient.PaymentRequest.prototype.createPaymentRequest = jest
    .fn()
    .mockResolvedValue(paymentRequestMock);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, PaymentRepository],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<PaymentService>(PaymentService);
    reposiotry = module.get(PaymentRepository);
    paymentMock = {
      id: 'randomId',
      paymentRequestId: 'randomPaymentRequestId',
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentStatus: PaymentStatus.PENDING,
      payoutLinkId: 'randomPayoutLinkId',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createPaymentRequest success', async () => {
    const createPaymentRepoSpy = jest
      .spyOn(reposiotry, 'create')
      .mockResolvedValue(paymentMock);
    const result = await service.createPaymentRequest(
      {
        amount: 10000,
        ewalletChannelCode: 'DANA',
      },
      'randomContractId',
    );
    expect(result).toEqual({
      id: 'randomId',
      xenditPaymentRequest: paymentRequestMock,
    });

    expect(createPaymentRepoSpy).toBeCalledWith({
      paymentRequestId: 'randomPaymentRequestId',
    });
  });

  it('updatePaymentRequestId success', async () => {
    const getRepositoryMock = jest
      .spyOn(reposiotry, 'getById')
      .mockResolvedValue(paymentMock);

    jest
      .spyOn(reposiotry, 'updatePaymentRequestId')
      .mockResolvedValue(paymentMock);

    service.updatePaymentRequestId('randomId', 'randomPaymentRequestId');

    expect(getRepositoryMock).toBeCalledWith('randomId');
  });
});
