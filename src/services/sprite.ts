import { Sprite } from '../models/sprite/sprite'
import spriteStore from '../stores/sprite'
import { SpriteBlob } from '../models/sprite/sprite-blob'

class SpriteService {
    public async getSprite(sprite: string): Promise<Sprite | null> {
        switch (sprite) {
            case 'will':
                return null
            case 'bagu':
                let baguSprite = spriteStore.baguSprite
                if (baguSprite === null) {
                    baguSprite = await this.getBaguSprite()
                    spriteStore.setBaguSprite(baguSprite)
                }
                return baguSprite

            case 'invisible':
                let invisibleSprite = spriteStore.invisibleSprite
                if (invisibleSprite === null) {
                    invisibleSprite = await this.getInvisibleSprite()
                    spriteStore.setInvisibleSprite(invisibleSprite)
                }

                return invisibleSprite
        }

        return null
    }

    private async getBaguSprite(): Promise<Sprite> {
        let sprite: Sprite = spriteStore.baguSprite
        if (sprite != null) return sprite

        const spriteBaguFirst = require('../assets/sprites/bagu/1a8000.bin')
        const spriteBaguSecond = require('../assets/sprites/bagu/1b8000.bin')

        const firstBlob: SpriteBlob = {
            Address: parseInt('0x1a8000', 16),
            Blob: await (await fetch(spriteBaguFirst)).blob(),
        }

        const secondBlob = {
            Address: parseInt('0x1b8000', 16),
            Blob: await (await fetch(spriteBaguSecond)).blob(),
        }

        sprite = {
            Blobs: [firstBlob, secondBlob],
        }

        return sprite
    }

    private async getInvisibleSprite(): Promise<Sprite> {
        let sprite: Sprite = spriteStore.invisibleSprite
        if (sprite != null) return sprite

        const spriteFirst = require('../assets/sprites/invisible/1a8000.bin')
        const spriteSecond = require('../assets/sprites/invisible/1b8000.bin')
        const spriteThird = require('../assets/sprites/invisible/1c8000.bin')

        const firstBlob: SpriteBlob = {
            Address: parseInt('0x1a8000', 16),
            Blob: await (await fetch(spriteFirst)).blob(),
        }

        const secondBlob = {
            Address: parseInt('0x1b8000', 16),
            Blob: await (await fetch(spriteSecond)).blob(),
        }

        const thirdBlob = {
            Address: parseInt('0x1c8000', 16),
            Blob: await (await fetch(spriteThird)).blob(),
        }

        sprite = {
            Blobs: [firstBlob, secondBlob, thirdBlob],
        }

        return sprite
    }
}

const spriteService = new SpriteService()
export default spriteService
