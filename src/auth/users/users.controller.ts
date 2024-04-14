import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Usuario')
@Controller('/usuario')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/registro')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.createUser(signUpDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('search')
  async getUserByEmail(@Query('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
