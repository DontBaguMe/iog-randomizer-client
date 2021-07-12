import RomPatchStep from './patch-step'
import { Spoiler } from './spoiler'

export default class Patch {
    public constructor(patchData: RomPatchStep[], patchFilename: string, spoilerData: Spoiler, spoilerFilename: string, permalinkId: string, fluteless: boolean) {
        this.patchData = patchData
        this.patchFilename = patchFilename
        this.spoilerData = spoilerData
        this.spoilerFilename = spoilerFilename
        this.permalinkId = permalinkId
        this.fluteless = fluteless
    }
    public patchData: RomPatchStep[]
    public patchFilename: string
    public spoilerData: Spoiler
    public spoilerFilename: string
    public permalinkId: string
    public fluteless: boolean
}
