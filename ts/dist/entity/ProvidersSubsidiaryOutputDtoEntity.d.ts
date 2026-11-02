import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ProvidersSubsidiaryOutputDto, ProvidersSubsidiaryOutputDtoListMatch } from '../KashimiTypes';
declare class ProvidersSubsidiaryOutputDtoEntity extends KashimiEntityBase<ProvidersSubsidiaryOutputDto> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ProvidersSubsidiaryOutputDtoEntity): ProvidersSubsidiaryOutputDtoEntity;
    list(this: any, reqmatch?: ProvidersSubsidiaryOutputDtoListMatch, ctrl?: Control): Promise<ProvidersSubsidiaryOutputDtoEntity[]>;
}
export { ProvidersSubsidiaryOutputDtoEntity };
