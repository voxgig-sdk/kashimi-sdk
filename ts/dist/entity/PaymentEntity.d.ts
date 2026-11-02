import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Payment, PaymentLoadMatch, PaymentListMatch, PaymentCreateData } from '../KashimiTypes';
declare class PaymentEntity extends KashimiEntityBase<Payment> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: PaymentEntity): PaymentEntity;
    load(this: any, reqmatch?: PaymentLoadMatch, ctrl?: Control): Promise<PaymentEntity>;
    list(this: any, reqmatch?: PaymentListMatch, ctrl?: Control): Promise<PaymentEntity[]>;
    create(this: any, reqdata?: PaymentCreateData, ctrl?: Control): Promise<PaymentEntity>;
}
export { PaymentEntity };
