import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { UserDTO } from "../dtos/userDTO";
import { User } from "../models/User";
import { UserUtil } from "../utils/userUtils";

interface IUserService {
  createUser(name: string, email: string): Promise<void>;
  removeUser(userId: string): Promise<void>;
  getUserById(userId: string): Promise<User>;
  updateUser(name: string, email: string): Promise<void>;
  getAllUsers(): Promise<User[]>; // list of users Model
}

export class UserService extends BaseAPI implements IUserService {
  getUserById(userId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  createUser(name: string, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeUser(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateUser(name: string, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async getAllUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
