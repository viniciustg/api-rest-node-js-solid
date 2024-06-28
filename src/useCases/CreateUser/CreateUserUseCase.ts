import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository"
import { ICreateUserDTO } from "./CreateUserDTO"

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }
    
    async execute(data: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        
        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }
    
        const user = new User(data);

        await this.usersRepository.save(user);   
        
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe Targa APP',
                email: 'equip@targaapp.com.br'
            },
            subject: 'Seja bem-vindo a plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma!</p>'
        })
    }
}