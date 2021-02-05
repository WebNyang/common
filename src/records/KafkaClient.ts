import { Kafka, logCreator, logLevel } from 'kafkajs';
import { logger } from '@sangwoo/logger';

const toWinstonLogLevel = (level: logLevel) => {
    switch(level) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
            return 'error';
        case logLevel.WARN:
            return 'warn';
        case logLevel.INFO:
            return 'info';
        case logLevel.DEBUG:
            return 'debug';
    }
};

const winstonLogCreator: logCreator = (logLevel) => {
    return ({namespace, level, label, log}) => {
        const { message, ...extra } = log;
        logger.log({
            level: toWinstonLogLevel(level),
            message,
            extra
        });
    };
};

/**
 * Singleton Kafka client class that manages kafka connection.
 * process.env.KAFKA_ID, process.env.KAFKA_BROKERS must be set to work properly.
 */
class KafkaClient {
    private static instance: KafkaClient;
    kafka: Kafka

    // Set constructor private to prevent create a new instance.
    private constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_ID,
            brokers: process.env.KAFKA_BROKERS!.split(' '),
            logCreator: winstonLogCreator
        });
    }

    /**
     * Return instance.
     *
     * @return Instance of the KafkaClient.
     */
    static getInstance(): KafkaClient {
        if (!KafkaClient.instance) {
            KafkaClient.instance = new KafkaClient();
        }

        return KafkaClient.instance;
    }
}

export { KafkaClient };
