import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Callback, CallbackLoadMatch } from '../KashimiTypes';
declare class CallbackEntity extends KashimiEntityBase<Callback> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: CallbackEntity): CallbackEntity;
    load(this: any, reqmatch?: CallbackLoadMatch, ctrl?: Control): Promise<CallbackEntity>;
}
export { CallbackEntity };
