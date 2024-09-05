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
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateRoleGroupDto } from './dto/create-role-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body(ValidationPipe) createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post('assign-roles')
  async assignRolesToGroup(@Body() createRoleGroupDto: CreateRoleGroupDto) {
    return this.groupsService.assignRolesToGroup(createRoleGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }
}
