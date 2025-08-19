import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { CloudinaryService } from "./cloudinary.service";
import { placeType } from "@prisma/client";
import { buffer } from "stream/consumers";
import { NOMEM } from "dns";
import { url } from "inspector";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { BadRequestException } from "@nestjs/common";

describe("PlaceController testes", () => {


    let controller: PlaceController;
    let placeService: any;
    let cloudinaryService: jest.Mocked<CloudinaryService>;

    beforeEach(async () => {
        const mockPlaceService = {
            findAll: jest.fn(), //deve listar todos os locals
            findpaginated: jest.fn(),//pagina locais
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        } as any;

        const mockCloudinaryService = {
            uploadImage: jest.fn(),
            deleteImage: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceController],
            providers: [
                { provide: PlaceService, useValue: mockPlaceService },
                { provide: CloudinaryService, useValue: mockCloudinaryService }
            ]
        }).compile()

        controller = module.get<PlaceController>(PlaceController);
        placeService = module.get(PlaceService);
        cloudinaryService = module.get(CloudinaryService);
    });

    //deve listar todos os locais
    it("deve listar todos os locais", async () => {

        const places = [
            { id: "1", nome: "praça", Type: placeType.BAR, phone: "889564126", Latitude: -3.7327, Longitude: -38.5567, images: [], created_at: new Date() },
            { id: "2", nome: "praça", Type: placeType.HOTEL, phone: "889564126", IsLatitude: -5.1234, Longitude: -2.3456, images: [], created_at: new Date() },
            { id: "3", nome: "praça", Type: placeType.RESTAURANTE, phone: "889564126", IsLatitude: -4.5678, Longitude: -3.4567, images: [], created_at: new Date() }
        ];

        // const places = [
        //     { id: "1", name: "praça", type: placeType.BAR, phone: "987766432", latitude: 23.8, longitude: 23.9, images: {}, created_at: Date.now }
        // ]
        placeService.findAll.mockResolvedValue(places)
        expect(await controller.findAll()).toEqual(places);
    });
    it("deve listar locais paginado", async () => {
        const limit = 10;
        const page = 1;

        const Place = {
            data: [
                { id: "1", nome: "praça", Type: placeType.BAR, phone: "889564126", Latitude: -3.7327, Longitude: -38.5567, images: [], created_at: new Date() },
                { id: "2", nome: "praça", Type: placeType.HOTEL, phone: "889564126", IsLatitude: -5.1234, Longitude: -2.3456, images: [], created_at: new Date() },
                { id: "3", nome: "praça", Type: placeType.RESTAURANTE, phone: "889564126", IsLatitude: -4.5678, Longitude: -3.4567, images: [], created_at: new Date() }
            ],
            meta: {
                total: 3,
                page: 1,
                lastPage: 1,
            },
        };

        placeService.findpaginated.mockResolvedValue(Place);

        const result = await controller.findpaginated(page, limit);

        expect(result).toEqual(Place);
        expect(placeService.findpaginated).toHaveBeenCalledWith(page, limit);
        expect(placeService.findpaginated).toHaveBeenCalledTimes(1);

    });
  // Deve criar um local (place)
  it('deve criar um local com imagens', async () => {
    const dto = {
      name: 'Praça',
      type: placeType.HOTEL,
      phone: '9023452',
      latitude: 28,
      longitude: 27,
    };
    const files = { images: [{ buffer: Buffer.from('img') }] } as any;

    
    cloudinaryService.uploadImage.mockResolvedValue({
      url: 'hhtps://',
      public_id: 'id_from_cloudinary',
    });

    placeService.create.mockResolvedValue({
      id: '1',
      images: [{ url: 'hhtps://', public_id: 'id_from_cloudinary' }],
      created_at: new Date(),
      ...dto,
    });

    const result = await controller.createPlace(dto as any, files);

    expect(cloudinaryService.uploadImage).toHaveBeenCalled();
    expect(placeService.create).toHaveBeenCalled();
    expect(result.id).toBe("1")


  });
//deve lançar erro ao criar sem imagens
//dica  .reject. toThrow()

it("deve lançar erro ao criar sem imagens", async () => { 
    const dto = {
        name: "local sem imagens",
        type: "BAR",
        phone: "889564126",
        latitude: -3.7327,
        longitude: -38.5567,
    }

    const mockFiles = { images: [] } as any
    await expect(controller.createPlace(dto as any, mockFiles)).rejects.toThrow(BadRequestException)
});



});
