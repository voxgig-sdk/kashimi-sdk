import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Latest, LatestListMatch } from '../KashimiTypes';
declare class LatestEntity extends KashimiEntityBase<Latest> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: LatestEntity): LatestEntity;
    list(this: any, reqmatch?: LatestListMatch, ctrl?: Control): Promise<LatestEntity[]>;
}
export { LatestEntity };
