import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ablity.factory';

@Module({
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory]
})
export class CaslModule {}
