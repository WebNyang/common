import { IBaseRecord } from './BaseRecord';
import { RecordKey } from './RecordKey';

export interface IContinuousTrainingCreatedRecord extends IBaseRecord {
    key: RecordKey.Created;
    value: IContinuousTrainingValue;
}

export interface IContinuousTrainingValue {
    _id?: string;
    title?: string;
    testSet: string;
    trainingSet: string;
    preTrainedModel: string;
    addTrainingSetTo: number;
    scoreThreshold: number;
    confidenceThreshold: number;
    maxTrainingSet: number;
    round?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}