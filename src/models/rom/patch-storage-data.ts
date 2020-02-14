import RomPatchStep from './patch-step'

export default interface PatchStorageData {
    patchData: RomPatchStep[]
    patchName: string
    checksum: string
    spoilerData?: string
    spoilerName?: string
}
