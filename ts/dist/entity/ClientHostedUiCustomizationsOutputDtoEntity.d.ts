import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { ClientHostedUiCustomizationsOutputDto, ClientHostedUiCustomizationsOutputDtoLoadMatch } from '../KashimiTypes';
declare class ClientHostedUiCustomizationsOutputDtoEntity extends KashimiEntityBase<ClientHostedUiCustomizationsOutputDto> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ClientHostedUiCustomizationsOutputDtoEntity): ClientHostedUiCustomizationsOutputDtoEntity;
    load(this: any, reqmatch?: ClientHostedUiCustomizationsOutputDtoLoadMatch, ctrl?: Control): Promise<ClientHostedUiCustomizationsOutputDtoEntity>;
}
export { ClientHostedUiCustomizationsOutputDtoEntity };
