import { IBaseRecord } from './BaseRecord';
import { RecordKey } from './RecordKey';

export interface ITrainingSetBuilderRecord extends IBaseRecord {
    key: RecordKey;
    value: {
        _id?: string;
        continuousTraining: string;
        round: number;
        candidates: {
            classId: number;
            images: string[];
        }[];
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    };
}
