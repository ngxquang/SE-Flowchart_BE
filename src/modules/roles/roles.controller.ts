import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleGroupDto } from '../groups/dto/create-role-group.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body(ValidationPipe) createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query('groupId') groupId?: number) {
    return this.rolesService.findAll(groupId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
