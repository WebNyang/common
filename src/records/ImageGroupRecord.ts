import { IBaseRecord } from './BaseRecord';
import { RecordKey } from './RecordKey';

export interface IImageGroupRecord extends IBaseRecord {
    key: RecordKey;
    value: {
        _id?: string;
        continuousTraining?: string;
        round?: number;
        title?: string;
        images: string[];
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    };
}
