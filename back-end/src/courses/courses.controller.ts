import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './schema/course.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ courses: Course[]; total: number }> {
    return this.coursesService.findAll(page, limit);
  }
}
