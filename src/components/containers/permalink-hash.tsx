import React from 'react'
import { Grid } from '@material-ui/core'

interface Props {
    hash_components: number[]
}

const style = {
    Section: {
        fontWeight: 600,
        fontSize: '1.4em',
    },
    Hash: {
        height: 24,
    },
}

export default function PermalinkHashDisplay(prop: Props) {
    const items = []
    prop.hash_components.forEach(element => {
        console.log(element)
        const hash_file = process.env.PUBLIC_URL + "/hash/hash_" + (element + 1) + ".png"
        items.push(< img src={hash_file} style={style.Hash} alt={"Hash " + (element + 1)} />)
    })
    return (
        <div style={{ padding: 5 }}>
            <Grid container>
                <Grid item xs={12}>
                    <span style={style.Section}>Rando Code:</span>
                    {items}
                </Grid>
            </Grid>
        </div>
    )
}
