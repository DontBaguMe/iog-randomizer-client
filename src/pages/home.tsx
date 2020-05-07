import React from 'react'
import { Modal, Grid, DialogContent } from '@material-ui/core'
import { observer } from 'mobx-react'

import uiStore from '../stores/ui'

import Error from '../components/modals/error'
import PleaseWait from '../components/modals/please-wait'

import RomDetailsContainer from '../components/containers/rom-details'
import EnemizerContainer from '../components/containers/enemizer'
import VariantsContainer from '../components/containers/variants'
import EntranceContainer from '../components/containers/entrance'
import PreferencesContainer from '../components/containers/preferences'

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

function HomePage() {
    const { isError, isProcessing } = uiStore

    return (
        <div style={Style.Root}>
            <Grid container spacing={2} style={Style.Container} wrap="wrap">
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <RomDetailsContainer />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <PreferencesContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <VariantsContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <EnemizerContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <EntranceContainer />
                        </Grid>
                    </Grid>
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
                <Modal open={isProcessing} onClose={() => {}} style={Style.Modal}>
                    <DialogContent style={Style.Content}>
                        <PleaseWait message="Generating Seed!" />
                    </DialogContent>
                </Modal>
            )}
        </div>
    )
}

export default observer(HomePage)
