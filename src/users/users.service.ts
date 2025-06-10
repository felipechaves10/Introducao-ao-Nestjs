import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {

   constructor(private prisma: PrismaService){}


   async create(data: Prisma.UserCreateInput): Promise<User>{

    return this.prisma.user.create({data})
   }
}