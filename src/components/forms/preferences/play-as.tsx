import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'
import { Grid } from '@material-ui/core'

import preferencesStore from '../../../stores/preferences'
import transparent from '../../../assets/transparent.png'
import sprites from '../../../assets/sprites.png'

type SelectionValues = {
    value: string
}

const styles = {
    spriteContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}

function PlayAs() {
    // The order of this array is important as the index of the selection value must correspond to the
    // image's position in the sprite sheet. For example, Bagu being the first alphabetically will be in position
    // 0 in the spritesheet, taking a rectangle of position 0,0 with width of 16 and height of 24. Will being the second
    // in the list will be (-16, 0, 16, 24). The first value is _negative_ because the CSS property equates to _left_
    // and in order to move _right_ in the array, we need to subtract.
    // TLDR: Make sure that the order of this array matches the order of sprites in the spritesheet
    const options: SelectionValues[] = [{ value: 'Bagu' }, { value: 'Will' }]

    function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        preferencesStore.setSprite(e.target.value)
    }

    function generateCss() {
        const width = 92
        const height = 144
        const index = options.findIndex(x => x.value === preferencesStore.sprite)
        const x = index * width

        return {
            width,
            height,
            background: `url(${sprites}) -${x}px 0px`,
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Play As</InputGroupText>
                    </InputGroupAddon>

                    <FormSelect defaultValue={preferencesStore.sprite} onChange={e => onSelectChange(e)}>
                        {options.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.value}
                            </option>
                        ))}
                    </FormSelect>
                </InputGroup>
            </Grid>
            <Grid item xs={6} style={styles.spriteContainer}>
                <img src={transparent} style={generateCss()} alt={`Sprite for ${preferencesStore.sprite}`} />
            </Grid>
        </Grid>
    )
}

export default observer(PlayAs)
