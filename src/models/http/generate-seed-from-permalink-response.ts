export default interface GenerateSeedFromPermalinkResponse {
    _id: string
    seed: number
    version: string
    patch: string
    patchName: string
    spoiler?: string
    spoilerName?: string
    settings?: string
    fluteless?: boolean
    created_at: Date
}
