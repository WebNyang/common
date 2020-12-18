import { IBaseRecord } from './BaseRecord';
import { RecordKey } from './RecordKey';
import { ModelType } from '../models';

export interface ITrainingResultRecord extends IBaseRecord {
    key: RecordKey;
    value: {
        _id?: string;
        continuousTraining: string;
        round: number;
        trainingRequest: string;
        trainingDuration: number;
        modelType: ModelType;
        models: {
            model?: string;
            path: string;
            step?: number;
            trainAcc?: number;
            trainLoss?: number;
            testAcc?: number;
            testLoss?: number;
        }[];
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    }
}
