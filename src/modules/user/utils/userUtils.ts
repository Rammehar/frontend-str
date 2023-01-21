import { UserDTO } from "../dtos/userDTO";
import { User } from "../models/User";

export class UserUtil {
  public static toViewModel(dto: UserDTO): User {
    return {
      name: dto.name,
      email: dto.email,
    };
  }
}
