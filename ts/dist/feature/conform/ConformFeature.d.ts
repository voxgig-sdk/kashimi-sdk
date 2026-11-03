import type { Context, FeatureOptions } from '../../types';
import type { KashimiSDK } from '../../KashimiSDK';
import { BaseFeature } from '../base/BaseFeature';
declare class ConformFeature extends BaseFeature {
    version: string;
    name: string;
    active: boolean;
    _client?: KashimiSDK;
    _options: any;
    init(ctx: Context, options: FeatureOptions): void | Promise<any>;
    PreRequest(this: any, ctx: any): void;
    _credential(this: any, ctx: any, spec: any, point: any): boolean;
    _form(this: any, spec: any, point: any): boolean;
    _record(this: any, kind: string): void;
}
export { ConformFeature };
