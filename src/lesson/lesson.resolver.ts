import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { StudentService } from "../student/student.service";

@Resolver(of => LessonType)
export class LessonResolver
{
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
        ){}

    @Query(returns => LessonType)
    lesson(@Args("id") id:string):Promise<Lesson>
    {
        return this.lessonService.getLesson(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args("createLessonInput") createLessonInput:CreateLessonInput
    ){
        return this.lessonService.createLesson(createLessonInput);
    }

    @Query(returns => [LessonType])
    getAllLessons():Promise<Lesson[]>
    {
        return this.lessonService.getAllLessons();
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(@Args("assignStudentsToLessonInput") assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson>
    {
        const { lessonId, studentsIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId,studentsIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson)
    {
        return this.studentService.getManyStudents(lesson.students);   
    }
}