import { left, right } from "../../../shared/core/either";
import { Result } from "../../../shared/core/result";
import { APIResponse } from "../../../shared/infra/services/api-response";
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { UserDTO } from "../dtos/userDTO";
import { User } from "../models/User";
import { UserUtil } from "../utils/userUtils";

interface IUserService {
  createUser(
    email: string,
    firstName: string,
    password: string
  ): Promise<APIResponse<void>>;
  removeUser(userId: string): Promise<void>;
  getUserById(userId: string): Promise<APIResponse<User>>;
  updateUser(name: string, email: string): Promise<void>;
  getAllUsers(): Promise<APIResponse<User[]>>; // list of users Model
}

export class UserService extends BaseAPI implements IUserService {
  public async getUserById(userId: string): Promise<APIResponse<User>> {
    try {
      const response = await this.get("/users", { userId }, {});
      const user = UserUtil.toViewModel(response.data.user as UserDTO);

      return right(Result.ok<User>(user));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<APIResponse<void>> {
    try {
      await this.post("/users", { name, email, password });
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }

  removeUser(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateUser(name: string, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async getAllUsers(): Promise<APIResponse<User[]>> {
    try {
      const response = await this.get("/users", {}, {});
      const users = response.data.users.map((user: UserDTO) =>
        UserUtil.toViewModel(user)
      );
      return right(Result.ok<User[]>(users));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}
