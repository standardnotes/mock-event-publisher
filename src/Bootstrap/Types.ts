const TYPES = {
  Logger: Symbol.for('Logger'),
  SNS: Symbol.for('SNS'),
  // env vars
  SNS_TOPIC_ARN: Symbol.for('SNS_TOPIC_ARN'),
  SNS_ENDPOINT: Symbol.for('SNS_ENDPOINT'),
  SNS_AWS_REGION: Symbol.for('SNS_AWS_REGION'),
  VERSION: Symbol.for('VERSION'),
  // Services
  DomainEventPublisher: Symbol.for('DomainEventPublisher'),
  Timer: Symbol.for('Timer'),
}

export default TYPES
