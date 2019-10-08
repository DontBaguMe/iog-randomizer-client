import React from 'react'
import { Modal, Grid, Box, DialogContent } from '@material-ui/core'
import { observer } from 'mobx-react'

import uiStore from '../stores/ui'

import Error from '../components/modals/error';
import PleaseWait from '../components/modals/please-wait';

import RomDetailsContainer from '../components/containers/rom-details';
import EnemizerContainer from '../components/containers/enemizer';
import VariantsContainer from '../components/containers/variants';
import EntranceContainer from '../components/containers/entrance';

const Style = {
    Root: {
      minWidth: "500px",
      marginTop: "40px",
      flexWrap: "wrap",
      maxWidth: "100vw"
    },
    Modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    Content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
}

const HomePage = observer(
    class HomePage extends React.Component {
        render() {
            return (
                <Box>
                    <Grid container spacing={2} style={Style.Root} wrap="wrap">
                        <Grid item xs={12} sm={12} md={12} lg={6}><RomDetailsContainer /></Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}><VariantsContainer /></Grid>
                                <Grid item xs={12}><EnemizerContainer /></Grid>
                                <Grid item xs={12}><EntranceContainer /></Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {uiStore.isError && (
                        <Modal open={uiStore.isError} onClose={() => uiStore.setError(false)} style={Style.Modal}>
                            <DialogContent style={Style.Content}>
                                <Error message={uiStore.errorText} />
                            </DialogContent>
                        </Modal>
                    )}

                    {uiStore.isProcessing && (
                        <Modal open={uiStore.isProcessing} onClose={() => { }} style={Style.Modal}>
                            <DialogContent style={Style.Content}>
                                <PleaseWait message="Generating Seed!" />
                            </DialogContent>
                        </Modal>
                    )}
                </Box>
            )
        }
    }
)

export default HomePage