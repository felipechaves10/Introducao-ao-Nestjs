import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class UpadateUserDto extends PartialType(CreateUserDto) {}