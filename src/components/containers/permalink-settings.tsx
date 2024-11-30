import React from 'react'
import {Grid} from '@material-ui/core'

type RenderableSetting = {
    key: string
    value: string
}

interface Props {
    title: string
    settings: RenderableSetting[]
    hidden: boolean
}

const style = {
    Section: {
        fontWeight: 600,
        fontSize: '1.4em',
    },
    Label: {
        fontWeight: 600,
    },
    Setting: {
        paddingLeft: 20,
    },
}

export default function PermalinkSettingsContainer(props: Props) {
    return (
        <div style={{padding: 5}} hidden={props.hidden}>
            <Grid container>
                <Grid item xs={12}>
                    <span style={style.Section}>{props.title}</span>
                </Grid>
                {props.settings.map((setting: RenderableSetting, index: number) => (
                    <Grid key={index} item xs={12}>
                        <Grid container>
                            <Grid item xs={5}>
                                <span style={style.Label}>{setting.key}:</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={style.Setting} key={index} id={setting.key}>
                                    {setting.value}
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
