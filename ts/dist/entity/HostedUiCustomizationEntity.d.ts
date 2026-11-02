import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { HostedUiCustomization, HostedUiCustomizationLoadMatch } from '../KashimiTypes';
declare class HostedUiCustomizationEntity extends KashimiEntityBase<HostedUiCustomization> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: HostedUiCustomizationEntity): HostedUiCustomizationEntity;
    load(this: any, reqmatch?: HostedUiCustomizationLoadMatch, ctrl?: Control): Promise<HostedUiCustomizationEntity>;
}
export { HostedUiCustomizationEntity };
