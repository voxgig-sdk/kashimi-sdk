import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Token, TokenCreateData } from '../KashimiTypes';
declare class TokenEntity extends KashimiEntityBase<Token> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: TokenEntity): TokenEntity;
    create(this: any, reqdata?: TokenCreateData, ctrl?: Control): Promise<TokenEntity>;
}
export { TokenEntity };
