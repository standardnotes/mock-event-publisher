import { DomainEventPublisherInterface, DomainEventService } from '@standardnotes/domain-events'
import { Request } from 'express'
import { TimerInterface } from '@standardnotes/time'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost, results } from 'inversify-express-utils'
import TYPES from '../Bootstrap/Types'
import { Logger } from 'winston'

@controller('/events')
export class EventsController extends BaseHttpController {
  constructor(
    @inject(TYPES.DomainEventPublisher) private domainEventPublisher: DomainEventPublisherInterface,
    @inject(TYPES.Timer) private timer: TimerInterface,
    @inject(TYPES.Logger) private logger: Logger,
  ) {
    super()
  }

  @httpPost('/')
  async publishEvent(request: Request): Promise<results.JsonResult> {
    this.logger.debug(`Received request with body: ${JSON.stringify(request.body)} with headers: ${JSON.stringify(request.headers)}`)

    this.logger.info(`Received event ${request.body.eventType} with payload: ${JSON.stringify(request.body.eventPayload)}`)

    await this.domainEventPublisher.publish({
      type: request.body.eventType as string,
      createdAt: this.timer.getUTCDate(),
      meta: {
        correlation: {
          userIdentifier: 'fake-event',
          userIdentifierType: 'uuid',
        },
        origin: DomainEventService.Payments,
      },
      payload: request.body.eventPayload,
    })

    return this.json({
      message: `Publishied event ${request.body.eventType} with payload: ${JSON.stringify(request.body.eventPayload)}`,
    })
  }
}
