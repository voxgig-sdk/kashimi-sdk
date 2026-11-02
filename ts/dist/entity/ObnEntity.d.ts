import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Obn, ObnLoadMatch, ObnCreateData, ObnUpdateData } from '../KashimiTypes';
declare class ObnEntity extends KashimiEntityBase<Obn> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ObnEntity): ObnEntity;
    load(this: any, reqmatch?: ObnLoadMatch, ctrl?: Control): Promise<ObnEntity>;
    create(this: any, reqdata?: ObnCreateData, ctrl?: Control): Promise<ObnEntity>;
    update(this: any, reqdata?: ObnUpdateData, ctrl?: Control): Promise<ObnEntity>;
}
export { ObnEntity };
