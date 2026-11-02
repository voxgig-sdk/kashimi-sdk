import { KashimiEntityBase } from '../KashimiEntityBase';
import type { KashimiSDK } from '../KashimiSDK';
import type { Control } from '../types';
import type { Report, ReportLoadMatch } from '../KashimiTypes';
declare class ReportEntity extends KashimiEntityBase<Report> {
    constructor(client: KashimiSDK, entopts: any);
    make(this: ReportEntity): ReportEntity;
    load(this: any, reqmatch?: ReportLoadMatch, ctrl?: Control): Promise<ReportEntity>;
}
export { ReportEntity };
