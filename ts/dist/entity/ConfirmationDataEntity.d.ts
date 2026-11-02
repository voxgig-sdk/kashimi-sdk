import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ConfirmationData, ConfirmationDataLoadMatch } from '../KashimiTypes';
declare class ConfirmationDataEntity extends KashimiEntityBase<ConfirmationData> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ConfirmationDataEntity): ConfirmationDataEntity;
    load(this: any, reqmatch?: ConfirmationDataLoadMatch, ctrl?: Control): Promise<ConfirmationDataEntity>;
}
export { ConfirmationDataEntity };
