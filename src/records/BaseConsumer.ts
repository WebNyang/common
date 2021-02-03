import { Kafka, Consumer, KafkaMessage } from 'kafkajs';

import { IBaseRecord } from './BaseRecord';

/**
 * Base Kafka consumer.
 */
export abstract class BaseConsumer<T extends IBaseRecord> {
    abstract topic: string;
    abstract consumerGroup: string;
    abstract eachMessage(key: T['key'], value: T['value']): void;

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
    async subscribe() {
        this.consumer = this.kafka.consumer({ groupId: this.consumerGroup });

        await this.consumer.connect();

        await this.consumer.subscribe({
            topic: this.topic,
            fromBeginning: true
        });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                this.consumer.pause([{ topic, partitions: [partition] }]);
                const parsedValue = this.parseValue(message);

                await this.eachMessage(message.key?.toString() || "", parsedValue);
                this.consumer.resume([{ topic, partitions: [partition] }]);
            }
        });
    }

    private parseValue(message: KafkaMessage) {
        const value = message.value?.toString();

        return value ? JSON.parse(value) : value;
    }
}
