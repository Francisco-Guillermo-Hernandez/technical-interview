import { Controller, Get, Query, Param } from "@nestjs/common";
import { DivisionsService } from "./divisions.service";
import { Division } from "../../entities/Division.entity";

@Controller("catalogs/divisions")
export class DivisionsController {
  constructor(private divisionsService: DivisionsService) {}

  @Get()
  public async findAll(): Promise<Division[]> {
    return await this.divisionsService.findAll();
  }

  @Get(":name")
  public async findOne(@Param("name") name: string): Promise<Division | null> {
    return await this.divisionsService.findOneByName(name);
  }

  @Get("search")
  public async findByFirstLevelName(
    @Query("firstLevelName") firstLevelName: string,
  ): Promise<Division[]> {
    if (firstLevelName) {
      return await this.divisionsService.findByFirstLevelName(firstLevelName);
    }
    return await this.divisionsService.findAll();
  }
}
