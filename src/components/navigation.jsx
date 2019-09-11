import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core'
import Configuration from '../configuration/config'

const style = {
    Root: {
        flexGrow: 1
    },
    Title: {
        color: '#FFFFFF'
    },
    Subtitle: {
        marginLeft: "1em",
        color: '#FFFFFF',
        flexGrow: 1
    }
}

export default function Navigation() {
    return (
        <div className={style.Root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" style={style.Title}>Illusion of Gaia Randomizer</Typography>
                    <Typography variant="subtitle2" style={style.Subtitle}>{Configuration.Version}</Typography>
                    <Link href="https://www.github.com/dontbagume/iogr"><FaGithub color="white" size="30" /></Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}