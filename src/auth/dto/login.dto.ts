import { IsEAN, IsEmail, IsNotEmpty, IsString } from "class-validator";


export
class loginndto{
    @IsEmail({}, { message: 'o email deve ser válido!'})
    email: string; 

    @IsString()
    @IsNotEmpty({ message: 'campo obrigatório!' })
    password: string;
}
