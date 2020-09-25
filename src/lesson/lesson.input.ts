import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength, IsDateString, IsUUID } from "class-validator";

@InputType()
export class CreateLessonInput
{
    @MinLength(1)
    @Field()
    name: string;

    @Field()
    @IsDateString()
    startDate: string;

    @Field()
    @IsDateString()
    endDate: string;

    @Field(() => [ID], { defaultValue: [] })
    @IsUUID("4",{ each: true })
    students: string[];
}