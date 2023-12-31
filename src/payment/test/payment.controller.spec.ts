import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../../auth/roles/role.guard';
import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';
import { PaymentRequestCreateDto } from '../dto/payment-request-create.dto';
import { PayoutLinkCreateDto } from '../dto/payout-link-create.dto';
import { IPayoutLinkData } from '../interface/payment.interface';

describe('PaymentController', () => {
  let controller: PaymentController;
  let paymentService: DeepMocked<PaymentService>;
  const mockFailGuard: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
      controllers: [PaymentController],
    })
      .useMocker(createMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockFailGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockFailGuard)
      .compile();
    controller = module.get<PaymentController>(PaymentController);
    paymentService = module.get(PaymentService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createPaymentRequest success', async () => {
    const paymentRequestCreateDto: PaymentRequestCreateDto = {
      amount: 100,
      ewalletChannelCode: 'JENIUSPAY',
    };

    const createSpy = jest
      .spyOn(paymentService, 'createPaymentRequest')
      .mockResolvedValue({
        id: 'id',
        xenditPaymentRequest: {
          id: '',
          created: '',
          updated: '',
          referenceId: '',
          businessId: '',
          currency: 'UNKNOWN_ENUM_VALUE',
          paymentMethod: undefined,
          status: 'PENDING',
        },
      });

    const mockRes = {
      status: {},
      json: {},
    };

    const res = await controller.createPaymentRequest(
      mockRes,
      paymentRequestCreateDto,
    );

    expect(createSpy).toBeCalledWith(paymentRequestCreateDto);
    expect(res).toEqual({
      id: 'id',
      xenditPaymentRequest: {
        id: '',
        created: '',
        updated: '',
        referenceId: '',
        businessId: '',
        currency: 'UNKNOWN_ENUM_VALUE',
        paymentMethod: undefined,
        status: 'PENDING',
      },
    });

    createSpy.mockRestore();
  });

  it('createPayoutLink success', async () => {
    const payoutLinkCreateDto: PayoutLinkCreateDto = {
      amount: 100,
      email: 'email@email.com',
    };

    const payoutMockData: IPayoutLinkData = {
      id: 'id',
      external_id: '123123',
      amount: 123,
      merchant_name: 'asd',
      status: 'ACCEPTED',
      expiration_timestamp: new Date(),
      created: new Date(),
      email: 'email@email.com',
      payout_url: 'asdasdasd.asdas.conm',
    };

    const createSpy = jest
      .spyOn(paymentService, 'createPayoutLink')
      .mockResolvedValue(payoutMockData);

    const mockRes = {
      status: {},
      json: {},
    };

    const res = await controller.createPayoutLink(mockRes, payoutLinkCreateDto);

    expect(createSpy).toBeCalledWith(payoutLinkCreateDto);
    expect(res).toEqual(payoutMockData);

    createSpy.mockRestore();
  });
});
