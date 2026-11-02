import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Followup, FollowupCreateData } from '../KashimiTypes';
declare class FollowupEntity extends KashimiEntityBase<Followup> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: FollowupEntity): FollowupEntity;
    create(this: any, reqdata?: FollowupCreateData, ctrl?: Control): Promise<FollowupEntity>;
}
export { FollowupEntity };
