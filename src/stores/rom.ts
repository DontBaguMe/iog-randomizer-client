import { observable, action, computed } from 'mobx'
import { openDB } from 'idb'

import RomPatchStep from '../models/rom/patch-step'
import { Spoiler } from '../models/rom/spoiler'

class Patch {
    public constructor(patchData: RomPatchStep[], patchFilename: string, spoilerData: Spoiler, spoilerFilename: string, permalinkId: string) {
        this.patchData = patchData
        this.patchFilename = patchFilename
        this.spoilerData = spoilerData
        this.spoilerFilename = spoilerFilename
        this.permalinkId = permalinkId
    }

    public patchData: RomPatchStep[]
    public patchFilename: string
    public spoilerData: Spoiler
    public spoilerFilename: string
    public permalinkId: string
}

class Rom {
    private readonly IOG_ROM_STORAGE_KEY: string = 'iog-base-rom'

    private _bytes: ArrayBuffer

    public constructor(bytes?: ArrayBuffer) {
        if (bytes) this._bytes = bytes
    }

    public async set(bytes: ArrayBuffer): Promise<void> {
        this._bytes = bytes
        await this.writeToStorage()
    }

    public async get(): Promise<ArrayBuffer> {
        if (!this._bytes) this._bytes = await this.loadFromStorage()

        return this._bytes
    }

    public async clear(): Promise<void> {
        this._bytes = null
        await this.clearStorage()
    }

    public exists(): boolean {
        return this._bytes && this._bytes.byteLength > -1
    }

    private async loadFromStorage(): Promise<ArrayBuffer> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        try {
            const obj: Uint8Array = await db.get('iogr', this.IOG_ROM_STORAGE_KEY)
            const buffer: ArrayBuffer = obj.buffer

            return buffer
        } catch (err) {
            return null
        } finally {
            db.close()
        }
    }

    private async writeToStorage(): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })

        const bytes = new Uint8Array(this._bytes)
        console.log('Writing to storage start', bytes)
        await db.put('iogr', bytes, this.IOG_ROM_STORAGE_KEY)
        console.log('Writing to storage end')
        db.close()
    }

    private async clearStorage(): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })

        console.log('Deleting storage')
        await db.delete('iogr', this.IOG_ROM_STORAGE_KEY)
        db.close()
    }
}

class RomStore {
    @observable public rom: Rom = new Rom()
    @observable public patch: Patch = null

    @computed public get canGenerate(): boolean {
        return this.rom.exists()
    }

    @action public async init(): Promise<void> {
        await this.rom.get()
    }

    @action public clear(): void {
        this.patch = null
        this.rom.clear().then(() => (this.rom = null))
    }
}

const romStore = new RomStore()
export { romStore, Rom, Patch }
