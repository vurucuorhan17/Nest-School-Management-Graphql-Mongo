import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class StudentService {
    
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>){}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student>
    {
        const { firstName, lastName } = createStudentInput;

        const student = await this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });

        return this.studentRepository.save(student);
    }

    async getAllStudents(): Promise<Student[]>
    {
        const result = await this.studentRepository.find();
        return result;
    }

    async getStudentById(id: string): Promise<Student>
    {
        const result = await this.studentRepository.findOne({ id });
        return result;
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]>
    {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                }
            }
        })
    }

}
