import { Patch } from '../../stores/rom'
import { PermalinkedSettings } from './permalinked-settings'

export type PermalinkedRom = {
    id: string
    created_at: Date
    patch: Patch
    settings: PermalinkedSettings
}
