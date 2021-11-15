import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesDB: CoursesRepository) {}

  @Post()
  async createCourse(
    @Body() course: Partial<Course>): Promise<Course> {
    console.log('creating new course');

    return this.coursesDB.addCourse(course);
  }

  @Get()
  findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Put(':courseId')
  async updatedCourse(
    @Param(':courseId') courseId: string,
    @Body() changes: Partial<Course>,
  ): Promise<Course> {
    console.log('updating course');

    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    console.log('deleting course');

    this.coursesDB.deleteCourse(courseId);
  }
}
