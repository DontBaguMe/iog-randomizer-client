import RomPatchStep from './patch-step'

export default interface PatchStorageData {
    patchData: RomPatchStep[]
    patchName: string
    checksum: string
    version: string
    createdAt: Date
    spoilerData?: string
    spoilerName?: string
}
