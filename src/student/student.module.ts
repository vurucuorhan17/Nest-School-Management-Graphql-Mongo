import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [
    StudentService,
    StudentResolver
  ],
  exports: [
    StudentService,
  ]
})
export class StudentModule {}
