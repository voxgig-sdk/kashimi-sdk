import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Healthcheck, HealthcheckLoadMatch } from '../KashimiTypes';
declare class HealthcheckEntity extends KashimiEntityBase<Healthcheck> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: HealthcheckEntity): HealthcheckEntity;
    load(this: any, reqmatch?: HealthcheckLoadMatch, ctrl?: Control): Promise<HealthcheckEntity>;
}
export { HealthcheckEntity };
