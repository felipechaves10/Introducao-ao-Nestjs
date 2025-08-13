
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserServices = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),

}


describe("User controller tests", () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockUserServices }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);

    });
    it("deve criar listar todos os usuario", async () => {
        const users = [
            { nome: "jonas", email: "email@gmail.com" },
            { nome: "joana", email: "email@gmaei.com" }
        ]
        mockUserServices.findAll.mockResolvedValue(users)

        expect(await controller.findAll()).toEqual(users)
        //02
    })
    it("mosta usario por id", async () => {
        const users = [
            { noma: "felipe", email: "felipe@gmail" },
            { nome: "joão", email: "joão@gmail" }

        ]
        mockUserServices.findOne.mockResolvedValue(users)
        expect(await controller.findOne('1')).toEqual(users)
    })
    //03
    it("deve atualizar  o usuario ", async () => {
        const user = [
            { nome: "jonas", email: "jonas@gmail.com" },
            { nome: "joana", email: "joana@gmail.com" }
        ]
        mockUserServices.update.mockResolvedValue(user)
        expect(await controller.update('1', user as any)).toEqual(user)
    })
    //04
    it("deve deletar o usuario", async () => {
        const id = '1';
        mockUserServices.remove.mockResolvedValue({ message: 'Usuário deletado com sucesso!' });

        expect(await controller.remove(id)).toEqual({ message: 'Usuário deletado com sucesso!' });
        expect(mockUserServices.remove).toHaveBeenCalledWith(id);
    });
});
