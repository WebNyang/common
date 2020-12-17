import { Kafka } from 'kafkajs';

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
            brokers: process.env.KAFKA_BROKERS!.split(' ')
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
