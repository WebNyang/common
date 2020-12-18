import { IBaseRecord } from './BaseRecord';
import { RecordKey } from './RecordKey';
import { ModelType } from '../models';

export interface IModelStorageRecord extends IBaseRecord {
    key: RecordKey;
    value: {
        _id?: string;
        continuousTraining?: string;
        round?: number;
        path: string;
        type: ModelType;
        client: string;
        name?: string;
        preTrainedOnly?: boolean;
        trainingRequest?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    }
}
