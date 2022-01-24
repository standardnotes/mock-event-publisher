const TYPES = {
  Logger: Symbol.for('Logger'),
  SNS: Symbol.for('SNS'),
  // env vars
  SNS_TOPIC_ARN: Symbol.for('SNS_TOPIC_ARN'),
  SNS_ENDPOINT: Symbol.for('SNS_ENDPOINT'),
  VERSION: Symbol.for('VERSION'),
  // Services
  DomainEventPublisher: Symbol.for('DomainEventPublisher'),
  Timer: Symbol.for('Timer'),
}

export default TYPES
