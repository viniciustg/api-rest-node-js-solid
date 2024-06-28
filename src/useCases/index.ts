import { MailtrapProvider } from "../providers/implementations/MailtrapMailProvider";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { CreateUserController } from "./CreateUser/CreateUseController";
import { CreateUserUseCase } from "./CreateUser/CreateUserUseCase";

const userRepository = new UserRepository()
const mailtrapMailProvider = new MailtrapProvider()
const createUserUseCase = new CreateUserUseCase(
    userRepository,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }