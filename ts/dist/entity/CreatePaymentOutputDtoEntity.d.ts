import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { CreatePaymentOutputDto, CreatePaymentOutputDtoCreateData } from '../KashimiTypes';
declare class CreatePaymentOutputDtoEntity extends KashimiEntityBase<CreatePaymentOutputDto> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: CreatePaymentOutputDtoEntity): CreatePaymentOutputDtoEntity;
    create(this: any, reqdata?: CreatePaymentOutputDtoCreateData, ctrl?: Control): Promise<CreatePaymentOutputDtoEntity>;
}
export { CreatePaymentOutputDtoEntity };
