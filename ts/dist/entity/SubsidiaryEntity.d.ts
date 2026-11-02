import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Subsidiary, SubsidiaryListMatch } from '../KashimiTypes';
declare class SubsidiaryEntity extends KashimiEntityBase<Subsidiary> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: SubsidiaryEntity): SubsidiaryEntity;
    list(this: any, reqmatch?: SubsidiaryListMatch, ctrl?: Control): Promise<SubsidiaryEntity[]>;
}
export { SubsidiaryEntity };
