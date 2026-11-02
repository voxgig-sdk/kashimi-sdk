import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ClientJwk, ClientJwkLoadMatch } from '../KashimiTypes';
declare class ClientJwkEntity extends KashimiEntityBase<ClientJwk> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ClientJwkEntity): ClientJwkEntity;
    load(this: any, reqmatch?: ClientJwkLoadMatch, ctrl?: Control): Promise<ClientJwkEntity>;
}
export { ClientJwkEntity };
