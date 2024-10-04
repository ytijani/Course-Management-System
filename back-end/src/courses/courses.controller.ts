import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './schema/course.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
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

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    try {
      return await this.coursesService.createCourse(createCourseDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'An error occurred while creating the course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
