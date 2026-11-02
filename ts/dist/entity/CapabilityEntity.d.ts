import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Capability, CapabilityListMatch } from '../KashimiTypes';
declare class CapabilityEntity extends KashimiEntityBase<Capability> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: CapabilityEntity): CapabilityEntity;
    list(this: any, reqmatch?: CapabilityListMatch, ctrl?: Control): Promise<CapabilityEntity[]>;
}
export { CapabilityEntity };
