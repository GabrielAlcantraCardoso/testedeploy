import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { IUserCreate, ILoginData } from "../types/user.types";
import * as bcrypt from "bcryptjs";
import { ErrorHandler } from "../utils/error";
import jwt from "jsonwebtoken";

export const createUserService = async (data: IUserCreate) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  data.password = passwordHash;

  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(data);
  await userRepository.save(user);

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const loginUserService = async (data: ILoginData) => {
  const { email, password } = data;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ErrorHandler(422, "Senha inválida");
  }

  const config = {
    secret: "igor",
    expiresIn: "1h",
  };

  const token = jwt.sign(
    { email: user.email, admin: user.isAdmin, firstName: user.firstName, id: user.id, phone: user.phone, lastName: user.lastName },
    config.secret,
    { expiresIn: config.expiresIn }
  );

  return { accessToken: token };
};

export const listUsersNotActiveService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({
    where: {
      isActive: false,
    },
  });

  const usersShow = [];
  for (let i = 0; i < users.length; i++) {
    const { password, ...userShow } = users[i];
    usersShow.push(userShow);
  }

  return usersShow;
};

export const aceptOrRejectUsersService = async (
  userId: number,
  isActive: boolean
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (typeof isActive != "boolean") {
    throw new ErrorHandler(400, "O campo 'is_active' é um valor boleano");
  }

  if (isActive) {
    user.isActive = true;
    userRepository.save(user);
  }

  await userRepository.delete(user);
};
