import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { PsuProvidedData, PsuProvidedDataUpdateData } from '../KashimiTypes';
declare class PsuProvidedDataEntity extends KashimiEntityBase<PsuProvidedData> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: PsuProvidedDataEntity): PsuProvidedDataEntity;
    update(this: any, reqdata?: PsuProvidedDataUpdateData, ctrl?: Control): Promise<PsuProvidedDataEntity>;
}
export { PsuProvidedDataEntity };
