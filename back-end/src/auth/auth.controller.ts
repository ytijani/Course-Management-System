import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Res,
  Req,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from 'src/user/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async getNewAccessToken(
    @Req() req: Request,
    @Res() res: Response,
    @Body('grant_type') grant: string | undefined,
  ): Promise<void> {
    const refreshToken = req.cookies['refresh_token'];

    // Check if grant type is valid
    if (!grant || grant !== 'refresh_token') {
      throw new BadRequestException('Bad Grant Type');
    }

    // Verify the validity of the refresh token
    if (
      !(await this.authService.isTokenValid(
        refreshToken,
        process.env.JWT_SECRET,
      ))
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Decode the payload from the refresh token
    const payload = this.authService.decodeToken(refreshToken);
    const { username, name } = payload;

    // Generate a new access token
    const newAccessToken = await this.authService.generateAccessToken({
      username,
      name,
    });

    // Set the new access token in a cookie
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Respond with the new access token
    res.status(201).json({ access_token: newAccessToken });
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    try {
      return await this.authService.register(username, email, password);
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.validateUser(username, password);
      const tokens = await this.authService.login(user);

      response.cookie('access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      response.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      response.send({ message: 'Logged in successfully' });
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
