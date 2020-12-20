import { IBaseRecord } from './BaseRecord';
import { RecordKey } from './RecordKey';
import { ModelType } from '../models';

export interface IEvaluationResultRecord extends IBaseRecord {
    key: RecordKey;
    value: {
        _id?: string;
        continuousTraining: string;
        round: number;
        validateModel: boolean;
        modelId: string;
        imageId: string;
        type: ModelType;
        mercuryResult?: {
            classId: number;
            score: number;
            confidence: number;
        };
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    };
}
