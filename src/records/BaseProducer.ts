import { Kafka, Producer } from 'kafkajs';

import { IBaseRecord } from './BaseRecord';

/**
 * Base Kafka producer.
 */
export abstract class BaseProducer<T extends IBaseRecord> {
    abstract topic: string;

    private kafka: Kafka;
    private producer!: Producer

    /**
     * Inject kafka and create producer.
     *
     * @param kafka Kafka object.
     */
    constructor(kafka: Kafka) {
        this.kafka = kafka;

        this.producer = this.kafka.producer();
    }

    /**
     * Connect to the brokers.
     * Every producer have to connect to broker before send.
     */
    async connect() {
        await this.producer.connect();
    }

    /**
     * Send a record to the topic.
     *
     * @param key Key of the record.
     * @param value Value of the record.
     */
    async send(key: T['key'], value: T['value']) {
        await this.producer.send({
            topic: this.topic,
            messages: [{
                key: key,
                value: JSON.stringify(value)
            }]
        });
    }
}
