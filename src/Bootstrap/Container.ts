import * as winston from 'winston'
import { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns'
import { Container } from 'inversify'
import { TimerInterface, Timer } from '@standardnotes/time'

import { Env } from './Env'
import TYPES from './Types'
import { SNSDomainEventPublisher } from '@standardnotes/domain-events-infra'

export class ContainerConfigLoader {
  async load(): Promise<Container> {
    const env: Env = new Env()
    env.load()

    const container = new Container()

    const logger = winston.createLogger({
      level: env.get('LOG_LEVEL') || 'info',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({ level: env.get('LOG_LEVEL') || 'info' }),
      ],
    })
    container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger)

    const snsConfig: SNSClientConfig = {
      region: env.get('SNS_AWS_REGION', true),
    }
    if (env.get('SNS_ENDPOINT', true)) {
      snsConfig.endpoint = env.get('SNS_ENDPOINT', true)
    }
    snsConfig.credentials = {
      accessKeyId: env.get('SNS_ACCESS_KEY_ID'),
      secretAccessKey: env.get('SNS_SECRET_ACCESS_KEY'),
    }
    const snsClient = new SNSClient(snsConfig)
    container.bind<SNSClient>(TYPES.SNS).toConstantValue(snsClient)

    // env vars
    container.bind(TYPES.SNS_TOPIC_ARN).toConstantValue(env.get('SNS_TOPIC_ARN'))
    container.bind(TYPES.SNS_AWS_REGION).toConstantValue(env.get('SNS_AWS_REGION'))
    container.bind(TYPES.SNS_ENDPOINT).toConstantValue(env.get('SNS_ENDPOINT'))
    container.bind(TYPES.SNS_SECRET_ACCESS_KEY).toConstantValue(env.get('SNS_SECRET_ACCESS_KEY'))
    container.bind(TYPES.SNS_ACCESS_KEY_ID).toConstantValue(env.get('SNS_ACCESS_KEY_ID'))
    container.bind(TYPES.VERSION).toConstantValue(env.get('VERSION'))

    container.bind<TimerInterface>(TYPES.Timer).toConstantValue(new Timer())

    container.bind<SNSDomainEventPublisher>(TYPES.DomainEventPublisher).toConstantValue(
      new SNSDomainEventPublisher(
        container.get(TYPES.SNS),
        container.get(TYPES.SNS_TOPIC_ARN)
      )
    )

    return container
  }
}
