import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
// import { Course } from './schema/course.schema';
// import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string,
    @Query('instructor') instructor: string,
    @Query('schedule') schedule: string,
  ) {
    return this.coursesService.getCourses(
      page,
      limit,
      search,
      instructor,
      schedule,
    );
  }

  // @Post()
  // async createCourse(
  //   @Body() createCourseDto: CreateCourseDto,
  // ): Promise<Course> {
  //   return this.coursesService.createCourse(createCourseDto);
  // }
}
