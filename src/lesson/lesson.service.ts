import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from "uuid";
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>){}

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson>
    {
        const { name,startDate,endDate,students } = createLessonInput;

        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });

        return await this.lessonRepository.save(lesson);
    }

    async getLesson(id: string): Promise<Lesson>
    {
        return await this.lessonRepository.findOne({ id });
    }

    async getAllLessons():Promise<Lesson[]>
    {
        const result = await this.lessonRepository.find({});
        return result;
    }

    async assignStudentsToLesson(lessonId: string, studentsIds: string[]): Promise<Lesson>
    {
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [...lesson.students,...studentsIds];
        return this.lessonRepository.save(lesson);
    }
}
