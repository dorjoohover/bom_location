import { Module } from "@nestjs/common";
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Zone, ZoneSchema } from "src/schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Zone.name, schema: ZoneSchema}])],
    controllers: [ZoneController],
    providers: [ZoneService]
})

export class ZoneModule {}