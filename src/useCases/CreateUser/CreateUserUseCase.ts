import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository"
import { ICreateUserDTO } from "./CreateUserDTO"

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUserRepository 
    ) { }
    
    async execute(data: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        
        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }
    
        const user = new User(data);

        await this.usersRepository.save(user);    
    }
}