// @ts-nocheck
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash || '');
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: (user as any).id, email: (user as any).email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(dto: any) {
    const user = await this.userService.register(dto);
    const payload = { sub: (user as any).id, email: (user as any).email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
