const TYPES = {
  Logger: Symbol.for('Logger'),
  SNS: Symbol.for('SNS'),
  // env vars
  SNS_TOPIC_ARN: Symbol.for('SNS_TOPIC_ARN'),
  SNS_ENDPOINT: Symbol.for('SNS_ENDPOINT'),
  SNS_AWS_REGION: Symbol.for('SNS_AWS_REGION'),
  SNS_AWS_SECRET_ACCESS_KEY: Symbol.for('SNS_AWS_SECRET_ACCESS_KEY'),
  SNS_AWS_ACCESS_KEY_ID: Symbol.for('SNS_AWS_ACCESS_KEY_ID'),
  VERSION: Symbol.for('VERSION'),
  // Services
  DomainEventPublisher: Symbol.for('DomainEventPublisher'),
  Timer: Symbol.for('Timer'),
}

export default TYPES
