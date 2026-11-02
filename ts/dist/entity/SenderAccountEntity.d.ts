import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { SenderAccount, SenderAccountLoadMatch, SenderAccountUpdateData } from '../KashimiTypes';
declare class SenderAccountEntity extends KashimiEntityBase<SenderAccount> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: SenderAccountEntity): SenderAccountEntity;
    load(this: any, reqmatch?: SenderAccountLoadMatch, ctrl?: Control): Promise<SenderAccountEntity>;
    update(this: any, reqdata?: SenderAccountUpdateData, ctrl?: Control): Promise<SenderAccountEntity>;
}
export { SenderAccountEntity };
