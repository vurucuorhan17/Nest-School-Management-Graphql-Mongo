import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class CreateStudentInput
{
    @IsNotEmpty()
    @MaxLength(15)
    @Field()
    firstName: string;

    @IsNotEmpty()
    @MaxLength(20)
    @Field()
    lastName: string;
}