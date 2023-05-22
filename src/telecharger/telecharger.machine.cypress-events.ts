import { EventType } from '../machine.types'

const events: Partial<Record<EventType, () => void>> = {}

export default events
