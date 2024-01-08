import { UserDTO } from "./userDTO";

export interface TokenDTO {
    UserDTO: UserDTO;
    Token: string;
}