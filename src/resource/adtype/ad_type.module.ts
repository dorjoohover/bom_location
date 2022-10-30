import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdType, AdTypeSchema } from "src/schema";
import { AdTypeController } from "./ad_type.controller";
import { AdTypeService } from "./ad_type.service";

@Module({
    imports: [MongooseModule.forFeature([{name: AdType.name, schema: AdTypeSchema}])],
    controllers: [AdTypeController],
    providers: [AdTypeService]
})

export class AdTypeModule {} 