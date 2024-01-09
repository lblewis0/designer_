import { UserDTO } from "./userDTO";

export interface TokenDTO {
    userDTO: UserDTO;
    token: string;
}