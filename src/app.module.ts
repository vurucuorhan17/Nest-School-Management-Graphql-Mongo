import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://localhost:27017/school-management-db",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Lesson,
        Student
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
