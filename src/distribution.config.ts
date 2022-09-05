import { Injectable } from '@nestjs/common';

@Injectable()
export class DistributionConfig {
    getDbName():string{
        return process.env.dbname || '';
    }
}


