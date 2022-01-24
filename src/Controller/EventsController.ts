import { DomainEventPublisherInterface } from '@standardnotes/domain-events'
import { Request } from 'express'
import { TimerInterface } from '@standardnotes/time'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost, results } from 'inversify-express-utils'
import TYPES from '../Bootstrap/Types'

@controller('/events')
export class EventsController extends BaseHttpController {
  constructor(
    @inject(TYPES.DomainEventPublisher) private domainEventPublisher: DomainEventPublisherInterface,
    @inject(TYPES.Timer) private timer: TimerInterface,
  ) {
    super()
  }

  @httpPost('/')
  async publishEvent(request: Request): Promise<results.JsonResult> {
    await this.domainEventPublisher.publish({
      type: request.body.eventType as string,
      createdAt: this.timer.getUTCDate(),
      meta: {
        correlation: {
          userIdentifier: 'fake-event',
          userIdentifierType: 'uuid',
        },
      },
      payload: request.body.eventPayload,
    })

    return this.json({
      message: `Publishied event ${request.body.eventType} with payload: ${JSON.stringify(request.body.eventPayload)}`,
    })
  }
}
