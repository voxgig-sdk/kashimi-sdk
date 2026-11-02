import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ConsentStatus, ConsentStatusLoadMatch } from '../KashimiTypes';
declare class ConsentStatusEntity extends KashimiEntityBase<ConsentStatus> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ConsentStatusEntity): ConsentStatusEntity;
    load(this: any, reqmatch?: ConsentStatusLoadMatch, ctrl?: Control): Promise<ConsentStatusEntity>;
}
export { ConsentStatusEntity };
