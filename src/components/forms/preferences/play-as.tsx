import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'
import { Grid } from '@material-ui/core'

import transparent from '../../../assets/transparent.png'
import sprites from '../../../assets/sprites.png'
import { settingsStore } from '../../../stores/settings'
import {PermalinkedRom} from "../../../models/rom/permalinked-rom";

interface Props {
    rom?: PermalinkedRom
}

type SelectionValues = {
    value: string
}

const styles = {
    spriteContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}

function PlayAs(props: Props) {
    const [sprite, setSprite] = useState(settingsStore.sprite)
    // The order of this array is important as the index of the selection value must correspond to the
    // image's position in the sprite sheet. For example, Bagu being the first alphabetically will be in position
    // 0 in the spritesheet, taking a rectangle of position 0,0 with width of 16 and height of 24. Will being the second
    // in the list will be (-16, 0, 16, 24). The first value is _negative_ because the CSS property equates to _left_
    // and in order to move _right_ in the array, we need to subtract.
    //
    // TLDR: Make sure that the order of this array matches the order of sprites in the spritesheet and the list should be
    // alphabetical after Will
    const options: SelectionValues[] = [{ value: 'Will' }, { value: 'Bagu' }, { value: 'Invisible' }]

    function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        settingsStore.sprite = event.target.value
        setSprite(event.target.value)
    }

    function generateCss() {
        const width = 92
        const height = 144
        const index = options.findIndex(x => x.value === settingsStore.sprite)
        const x = index * width

        return {
            width,
            height,
            background: `url(${sprites}) -${x}px 0px`,
        }
    }
    if (props.rom !== undefined) {
        if (props.rom.patch.fluteless) {
            return <Grid container spacing={2}>
                <div>Sprite selection is disabled in Fluteless seeds after generation</div>
            </Grid>
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Play As</InputGroupText>
                    </InputGroupAddon>

                    <FormSelect defaultValue={sprite} onChange={e => onSelectChange(e)}>
                        {options.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.value}
                            </option>
                        ))}
                    </FormSelect>
                </InputGroup>
            </Grid>
            <Grid item xs={6} style={styles.spriteContainer}>
                <img src={transparent} style={generateCss()} alt={`Sprite for ${sprite}`} />
            </Grid>
        </Grid>
    )
}

export default observer(PlayAs)
