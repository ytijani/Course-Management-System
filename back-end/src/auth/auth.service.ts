import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const existingUser = await this.userModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        throw new ConflictException('Username or email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_SECRET,
    });
  }

  async isTokenValid(token: string, secretKey: string): Promise<any> {
    try {
      await this.jwtService.verifyAsync(token, { secret: secretKey });
      return true;
    } catch {
      return false;
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  removeCookie(@Res() response: any, cookieName: string, params: any) {
    response.cookie(cookieName, '', params);
  }

  async login(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { username: user.username, sub: user._id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30d',
    });
    return { access_token, refresh_token };
  }
}
