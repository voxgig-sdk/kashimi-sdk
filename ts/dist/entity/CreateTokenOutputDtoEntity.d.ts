import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { CreateTokenOutputDto, CreateTokenOutputDtoCreateData } from '../KashimiTypes';
declare class CreateTokenOutputDtoEntity extends KashimiEntityBase<CreateTokenOutputDto> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: CreateTokenOutputDtoEntity): CreateTokenOutputDtoEntity;
    create(this: any, reqdata?: CreateTokenOutputDtoCreateData, ctrl?: Control): Promise<CreateTokenOutputDtoEntity>;
}
export { CreateTokenOutputDtoEntity };
