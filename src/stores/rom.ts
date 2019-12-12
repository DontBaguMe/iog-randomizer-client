import { observable, action } from 'mobx'
import { openDB } from 'idb'

import RomPatchStep from '../models/rom/patch-step'

const IOG_ROM_STORAGE_KEY: string = 'iog-base-rom'

class RomStore {
    @observable originalFile: ArrayBuffer = null
    @observable patchData: RomPatchStep[] = null
    @observable patchName: string = null
    @observable spoilerData = null
    @observable spoilerName: string = null

    @action.bound
    public clear() {
        this.patchData = null
        this.patchName = null
        this.spoilerData = null
        this.spoilerName = null
    }

    @action.bound
    public async setOriginalFile(file: ArrayBuffer): Promise<void> {
        this.originalFile = file
        await this.persistArrayBufferToStorage(IOG_ROM_STORAGE_KEY, file)
    }

    @action.bound
    public setPatchData(patchData: RomPatchStep[], patchName: string) {
        this.patchData = patchData
        this.patchName = patchName
    }

    @action.bound
    public setSpoilerData = (d, n) => {
        this.spoilerData = d
        this.spoilerName = n
    }

    @action.bound
    public async loadRomFromStorage(): Promise<void> {
        const rom = await this.loadArrayBufferFromStorage(IOG_ROM_STORAGE_KEY)
        if (!rom || rom.byteLength === 0) return

        this.originalFile = rom
    }

    @action.bound
    public async clearRom(): Promise<void> {
        this.originalFile = null
        await this.destroyArrayBufferFromStorage(IOG_ROM_STORAGE_KEY)
    }

    private async persistArrayBufferToStorage(
        key: string,
        buffer: ArrayBuffer,
    ): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: upgradeDb =>
                upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        await db.put('iogr', new Uint8Array(buffer), key)

        db.close()
    }

    private async destroyArrayBufferFromStorage(key: string): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: upgradeDb =>
                upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        await db.delete('iogr', key)

        db.close()
    }

    private async loadArrayBufferFromStorage(
        key: string,
    ): Promise<ArrayBuffer> {
        const db = await openDB('iogr', 1, {
            upgrade: upgradeDb =>
                upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })
        try {
            const obj: Uint8Array = await db.get('iogr', key)
            const buffer: ArrayBuffer = obj.buffer

            return buffer
        } catch (err) {
            return null
        } finally {
            db.close()
        }
    }
}

const romStore = new RomStore()
export default romStore
