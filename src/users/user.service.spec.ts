import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";
import { IsStrongPassword } from "class-validator";
import { dot } from "node:test/reporters";


// Mock do PrismaService
// Aqui estamos criando um mock do PrismaService para simular as operações de banco de dados
const mockPrisma = {
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

// Testes para o UsersService
// Aqui estamos criando uma suite de testes para o UsersService, que é responsável por gerenciar usuários
// Usamos o Jest para criar mocks e verificar se as funções estão sendo chamadas corretamente
describe("UsersService", () => {
    let service: UsersService;

    // Antes de cada teste, criamos uma instância do UsersService com o PrismaService mockado
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    // Testes individuais
    // Aqui definimos os testes individuais para cada funcionalidade do UsersService
    it("deve criar um usuário", async () => {
        const dto = { name: "Jonas", email: "jonas@example.com", password: "123" };
        mockPrisma.user.create.mockResolvedValue(dto);

        const result = await service.create(dto as any);
        expect(result).toEqual(dto);
        expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });

    });
    //  02 teste para o metodo UserSevrice.findAll
    it("deve lista todos usuário", async () => {
        mockPrisma.user.findMany.mockResolvedValue([]);

        const result = await service.findAll();
        expect(result).toEqual([]);
        expect(mockPrisma.user.findMany,).toHaveBeenCalledWith();
    });

    //03
    it("mosta usuario por Id", async () => {
        const User = [
            { id: 1, nome: 'felipe', email: 'felipe@gmail.com', Password: '123' },
            { id: 2, nome: 'maria', email: 'maria@gmail.com', password: '123' },
            { id: 3, nome: 'joão', email: 'joão@gmail.com', password: '123' },
        ];
        mockPrisma.user.findUnique.mockResolvedValue(User)
        const result = await service.findOne('2');
        expect(result).toEqual(User);

    });

    //04
    it('Deve atualizar um usuário', async () => {
        const dto = { name: "jonas", email: "jonas@gmail.com", password: "123" };
        mockPrisma.user.update.mockResolvedValue(dto);

        const result = await service.update('1', dto as any);
        expect(result).toEqual(dto);
        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: dto,
        });
    });

        //05
     it("deve deleta um usuario",async () => {
        const dto = { id: "1", name: "rosa", email: "rosa@gmail.com", password: "123" };
        mockPrisma.user.delete.mockResolvedValue(dto);

        const result = await service.remove('1');
        expect(result).toEqual(dto);
        expect(mockPrisma.user.delete).toHaveBeenCalledWith({
            where: { id: '1' },
        });
     })   
});











// Executar os  testes: npm test