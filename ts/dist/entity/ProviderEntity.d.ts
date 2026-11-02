import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Provider, ProviderListMatch } from '../KashimiTypes';
declare class ProviderEntity extends KashimiEntityBase<Provider> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ProviderEntity): ProviderEntity;
    list(this: any, reqmatch?: ProviderListMatch, ctrl?: Control): Promise<ProviderEntity[]>;
}
export { ProviderEntity };
