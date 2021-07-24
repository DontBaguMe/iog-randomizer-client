import React from 'react'
import { Modal, Grid, DialogContent } from '@material-ui/core'
import { observer } from 'mobx-react'

import uiStore from '../stores/ui'

import Error from '../components/modals/error'
import PleaseWait from '../components/modals/please-wait'

import RomMysteryContainer from '../components/containers/rom-mystery'
import PreferencesContainer from '../components/containers/preferences'
import CustomizerContainer from '../components/containers/customizer'

const Style = {
    Root: {
        padding: 40,
        maxWidth: '100vw',
    },
    Container: {
        minWidth: 500,
    },
    Modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

function CustomizerPage() {
    const { isError, isProcessing } = uiStore

    return (
        <div style={Style.Root}>

            <Grid container spacing={2} style={Style.Container} wrap="wrap">
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <RomMysteryContainer />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <PreferencesContainer />
                </Grid>
                <Grid item>
                    <CustomizerContainer />
                </Grid>
            </Grid>

            {isError && (
                <Modal open={isError} onClose={() => uiStore.setError(false)} style={Style.Modal}>
                    <DialogContent style={Style.Content}>
                        <Error message={uiStore.errorText} />
                    </DialogContent>
                </Modal>
            )}

            {isProcessing && (
                <Modal open={isProcessing} onClose={() => { }} style={Style.Modal}>
                    <DialogContent style={Style.Content}>
                        <PleaseWait message="Generating Seed!" />
                    </DialogContent>
                </Modal>
            )}
        </div>
    )
}

export default observer(CustomizerPage)
