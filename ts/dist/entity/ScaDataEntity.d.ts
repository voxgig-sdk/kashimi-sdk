import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ScaData, ScaDataLoadMatch, ScaDataUpdateData } from '../KashimiTypes';
declare class ScaDataEntity extends KashimiEntityBase<ScaData> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ScaDataEntity): ScaDataEntity;
    load(this: any, reqmatch?: ScaDataLoadMatch, ctrl?: Control): Promise<ScaDataEntity>;
    update(this: any, reqdata?: ScaDataUpdateData, ctrl?: Control): Promise<ScaDataEntity>;
}
export { ScaDataEntity };
