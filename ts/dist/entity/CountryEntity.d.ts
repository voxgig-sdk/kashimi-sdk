import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Country, CountryListMatch } from '../KashimiTypes';
declare class CountryEntity extends KashimiEntityBase<Country> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: CountryEntity): CountryEntity;
    list(this: any, reqmatch?: CountryListMatch, ctrl?: Control): Promise<CountryEntity[]>;
}
export { CountryEntity };
