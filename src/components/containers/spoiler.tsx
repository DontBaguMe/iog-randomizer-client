import React from 'react'
import { Spoiler, Item } from '../../models/rom/spoiler'
import { Grid } from '@material-ui/core'

interface Props {
    data: Spoiler
}

const style = {
    label: {
        fontWeight: 600,
    },
    items: {
        paddingTop: 5
    }
}

function KeyValueRenderer(props: { name: string; value: string }) {
    return (
        <Grid container>
            <Grid item xs>
                <span style={style.label}>{props.name}:</span>
            </Grid>
            <Grid item xs>
                <span>{props.value}</span>
            </Grid>
        </Grid>
    )
}

function KeyValuesRenderer(props: { name: string; values: any[] }) {
    return (
        <Grid container>
            <Grid item xs>
                <span style={style.label}>{props.name}:</span>
            </Grid>
            <Grid item xs>
                {props.values.map((value, index) => (
                    <span key={index}>
                        {value}
                        {index < props.values.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </Grid>
        </Grid>
    )
}

function ItemArrayRenderer(props: { name: string; values: Item[] }) {
    return (
        <Grid container style={style.items}>
            <Grid item xs={12}>
                <span style={style.label}>{props.name}</span>
            </Grid>
            <Grid item xs={12}>
                {props.values.map((value: Item, index: number) => (
                    <Grid key={index} container>
                        <Grid item xs={6}>
                            {value.location}
                        </Grid>
                        <Grid item xs={6}>
                            {value.name}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default function SpoilerView(props: Props) {
    return (
        <>
            <KeyValueRenderer name="Kara Location" value={props.data.kara_location} />
            <KeyValuesRenderer name="Status Required" values={props.data.statues_required} />
            <KeyValuesRenderer name="Boss Order" values={props.data.boss_order} />
            <KeyValuesRenderer name="Jeweler Amounts" values={props.data.jeweler_amounts} />
            <KeyValuesRenderer name="Inca Tiles" values={props.data.inca_tiles} />
            <KeyValuesRenderer name="Hieroglyph Order" values={props.data.hieroglyph_order} />
            <ItemArrayRenderer name="Item Locations" values={props.data.items} />
        </>
    )
}
