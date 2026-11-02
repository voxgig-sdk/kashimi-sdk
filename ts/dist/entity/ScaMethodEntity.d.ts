import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ScaMethod, ScaMethodLoadMatch, ScaMethodUpdateData } from '../KashimiTypes';
declare class ScaMethodEntity extends KashimiEntityBase<ScaMethod> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ScaMethodEntity): ScaMethodEntity;
    load(this: any, reqmatch?: ScaMethodLoadMatch, ctrl?: Control): Promise<ScaMethodEntity>;
    update(this: any, reqdata?: ScaMethodUpdateData, ctrl?: Control): Promise<ScaMethodEntity>;
}
export { ScaMethodEntity };
