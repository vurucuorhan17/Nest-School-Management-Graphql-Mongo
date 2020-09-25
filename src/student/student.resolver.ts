import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { Student } from "./student.entity";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";

@Resolver()
export class StudentResolver
{
    constructor(private studentService: StudentService){}

    @Query(returns => [StudentType])
    getAllStudents(): Promise<Student[]>
    {
        return this.studentService.getAllStudents();
    }

    @Mutation(returns => StudentType)
    createStudent(
        @Args("createStudentInput") createStudentInput: CreateStudentInput
    ): Promise<Student>
    {
        return this.studentService.createStudent(createStudentInput);
    }

    @Query(returns => StudentType)
    getStudentById(
        @Args("id") id:string
    ):Promise<Student>
    {
        return this.studentService.getStudentById(id);
    }

}