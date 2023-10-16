// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from './entity/user.entity';
// import { GoogleAuth } from '../google-auth/entity/googleauth.entity';

// describe('UserService', () => {
//   let userService: UserService;

//   const mockUserRepository = {
//     findOne: jest.fn(),
//     create: jest.fn(),
//     save: jest.fn(),
//   };

//   const mockGoogleAuthRepository = {
//     save: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(User),
//           useValue: mockUserRepository,
//         },
//         {
//           provide: getRepositoryToken(GoogleAuth),
//           useValue: mockGoogleAuthRepository,
//         },
//       ],
//     }).compile();

//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });

//   describe('createGoogleUser', () => {
//     it('should create a new user and associate it with GoogleAuth', async () => {
//       const googleAuthData = {
//         email: 'test@gmail.com',
//         firstName: 'John',
//         lastName: 'Doe',
//         // Add other fields as needed
//       };

//       const newUser = new User();
//       newUser.email = googleAuthData.email;
//       newUser.firstName = googleAuthData.firstName;
//       newUser.lastName = googleAuthData.lastName;

//       mockUserRepository.findOne.mockResolvedValue(null); // Simulate that the user doesn't exist
//       mockUserRepository.create.mockReturnValue(newUser);
//       mockUserRepository.save.mockResolvedValue(newUser);

//       const googleAuth = new GoogleAuth();
//       // Set GoogleAuth properties here

//       mockGoogleAuthRepository.save.mockResolvedValue(googleAuth);

//       const result = await userService.createGoogleUser(googleAuthData);

//       expect(result).toEqual(newUser);
//       expect(mockUserRepository.findOne).toHaveBeenCalledWith({
//         where: { email: googleAuthData.email },
//       });
//       expect(mockUserRepository.create).toHaveBeenCalledWith(newUser);
//       expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
//       expect(mockGoogleAuthRepository.save).toHaveBeenCalledWith({
//         ...googleAuthData,
//         user: newUser,
//       });
//     });

//     it('should return existing user if one with the same email exists', async () => {
//       const googleAuthData = {
//         email: 'test@example.com',
//         firstName: 'John',
//         lastName: 'Doe',
//         // Add other fields as needed
//       };

//       const existingUser = new User();
//       existingUser.email = googleAuthData.email;

//       mockUserRepository.findOne.mockResolvedValue(existingUser);

//       const result = await userService.createGoogleUser(googleAuthData);

//       expect(result).toEqual(googleAuthData);
//       expect(mockUserRepository.findOne).toHaveBeenCalledWith({
//         where: { email: googleAuthData.email },
//       });
//       expect(mockUserRepository.create).not.toHaveBeenCalled();
//       expect(mockUserRepository.save).not.toHaveBeenCalled();
//       expect(mockGoogleAuthRepository.save).not.toHaveBeenCalled();
//     });
//   });

//   describe('findUserByEmail', () => {
//     it('should find a user by email', async () => {
//       const email = 'test@gmail.com';
//       const user = new User();
//       user.email = email;

//       mockUserRepository.findOne.mockResolvedValue(user);
//       /* mockResolvedValue(user): This part sets up the behavior of the findOne method when it is called during the test.
//          It tells the mock repository to resolve a Promise with the provided user object when findOne is called.*/

//       const result = await userService.findUserByEmail(email);

//       expect(result).toEqual(user);
//       expect(mockUserRepository.findOne).toHaveBeenCalledWith({
//         where: { email },
//       });
//     });

//     it('should return null if no user with the given email is found', async () => {
//       const email = 'nonexistent@gmail.com';

//       mockUserRepository.findOne.mockResolvedValue(null);

//       const result = await userService.findUserByEmail(email);

//       expect(result).toBeNull();
//       expect(mockUserRepository.findOne).toHaveBeenCalledWith({
//         where: { email },
//       });
//     });
//   });
// });
