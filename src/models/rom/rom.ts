import { openDB } from 'idb'
import logService from '../../services/log'

export default class Rom {
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
        logService.debug('Writing to storage start', bytes)
        await db.put('iogr', bytes, this.IOG_ROM_STORAGE_KEY)
        logService.debug('Writing to storage end')
        db.close()
    }

    private async clearStorage(): Promise<void> {
        const db = await openDB('iogr', 1, {
            upgrade: (upgradeDb) => upgradeDb.createObjectStore('iogr', { autoIncrement: true }),
        })

        logService.debug('Deleting storage')
        await db.delete('iogr', this.IOG_ROM_STORAGE_KEY)
        db.close()
    }
}
