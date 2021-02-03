import { Kafka, Consumer, KafkaMessage, ConsumerRunConfig } from 'kafkajs';

import { IBaseRecord } from './BaseRecord';

export interface IMessageMeta {
    topic: string;
    partition: number;
    offset: string;
}

/**
 * Base Kafka consumer.
 */
export abstract class BaseConsumer<T extends IBaseRecord> {
    abstract topic: string;
    abstract consumerGroup: string;
    abstract eachMessage(key: T['key'], value: T['value'], meta?: IMessageMeta): void;

    private kafka: Kafka;
    private consumer!: Consumer

    /**
     * Inject kafka.
     *
     * @param kafka Kafka object.
     */
    constructor(kafka: Kafka) {
        this.kafka = kafka;
    }

    /**
     * Subscribe the topic within a given consumer group.
     */
    async subscribe(runConfig?: ConsumerRunConfig) {
        this.consumer = this.kafka.consumer({ groupId: this.consumerGroup });

        await this.consumer.connect();

        await this.consumer.subscribe({
            topic: this.topic,
            fromBeginning: true
        });

        await this.consumer.run({
            ...runConfig,
            eachMessage: async ({ topic, partition, message }) => {
                this.consumer.pause([{ topic, partitions: [partition] }]);
                const parsedValue = this.parseValue(message);
                const meta = { topic, partition, offset: message.offset }

                await this.eachMessage(message.key?.toString() || "", parsedValue, meta);
                this.consumer.resume([{ topic, partitions: [partition] }]);
            }
        });
    }

    private parseValue(message: KafkaMessage) {
        const value = message.value?.toString();

        return value ? JSON.parse(value) : value;
    }
}
