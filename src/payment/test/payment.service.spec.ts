// import { Test, TestingModule } from '@nestjs/testing';
// import { DeepMocked, createMock } from '@golevelup/ts-jest';
// import { RatingService } from '../payment.service';
// import { IRating } from '../interface/payment.interface';
// import { RatingRepository } from '../rating.repository';
// import { RatingCreateDto } from '../dto/payment-request-create.dto';
// import { RatingUpdateDto } from '../dto/rating-update.dto';

// describe('RatingService', () => {
//   let service: RatingService;
//   let reposiotry: DeepMocked<RatingRepository>;
//   let ratingMock: IRating;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [RatingService, RatingRepository],
//     })
//       .useMocker(createMock)
//       .compile();

//     service = module.get<RatingService>(RatingService);
//     reposiotry = module.get(RatingRepository);
//     ratingMock = {
//       id: 'randomId',
//       givenByUserId: 'randomUserId',
//       ratingOf10: 9,
//     };
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('create success', async () => {
//     const createRatingDto: RatingCreateDto = {
//       userId: 'randomUserId',
//       givenByUserId: 'randomUserId',
//       ratingOf10: 9,
//     };
//     const createSpy = jest
//       .spyOn(reposiotry, 'create')
//       .mockResolvedValue(ratingMock);

//     const res = await service.create(createRatingDto);

//     expect(createSpy).toBeCalledTimes(1);
//     expect(createSpy).toBeCalledWith(createRatingDto);
//     expect(res).toEqual(ratingMock);

//     createSpy.mockRestore();
//   });
//   it('update success', async () => {
//     const ratingUpdate: RatingUpdateDto = {
//       id: 'randomId',
//       userId: 'randomUserId',
//       givenByUserId: 'randomUserId',
//       ratingOf10: 9,
//     };
//     const updateSpy = jest
//       .spyOn(reposiotry, 'update')
//       .mockResolvedValue(ratingMock);

//     const res = await service.update(ratingUpdate);

//     expect(updateSpy).toBeCalledTimes(1);
//     const { id, ...jobData } = ratingUpdate;
//     expect(updateSpy).toBeCalledWith(id, jobData);
//     expect(res).toEqual(ratingMock);

//     updateSpy.mockRestore();
//   });
// });
