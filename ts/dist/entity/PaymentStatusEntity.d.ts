import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { PaymentStatus, PaymentStatusLoadMatch, PaymentStatusListMatch } from '../KashimiTypes';
declare class PaymentStatusEntity extends KashimiEntityBase<PaymentStatus> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: PaymentStatusEntity): PaymentStatusEntity;
    load(this: any, reqmatch?: PaymentStatusLoadMatch, ctrl?: Control): Promise<PaymentStatusEntity>;
    list(this: any, reqmatch?: PaymentStatusListMatch, ctrl?: Control): Promise<PaymentStatusEntity[]>;
}
export { PaymentStatusEntity };
