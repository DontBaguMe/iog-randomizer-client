import React from 'react'

import seedGeneratorStore from '../stores/generator'
//import Seed from './seed'

import { observer } from 'mobx-react';
// import RomUpload from '../rom-upload';
// import { DifficultyContainer, GoalContainer, GameLogicForm } from '.'
// import Variations from '../variation-options';
// import StartLocation from '../start-location';
// import VariationOptions from '../variation-options';

import { Grid } from '@material-ui/core'

import RomDetailsContainer from './containers/rom-details'
import EnemizerContainer from './containers/enemizer'
import EntranceContainer from './containers/entrance'
import VariantsContainer from './containers/variants';


const styles = {
    Root: {
        marginTop: "40px"
    },
    Panel: {
        marginLeft: "40px",
        marginRight: "40px"
    },
    Card: {
        marginBottom: "20px"
    },
    Row: {
        marginBottom: "20px"
    }
}

const SeedGenerator = observer(
    class SeedGenerator extends React.Component {
        state = {
            showDownload: false,
            romUri: null,
            romName: null,
            spoilerUri: null,
            spoilerName: null,
            expandedPanelIndices: [0]
        }

        constructor(props) {
            super(props)

            this.generateSeed = this.generateSeed.bind(this)
            this.requestSeed = this.requestSeed.bind(this)
            this.requestSpoiler = this.requestSpoiler.bind(this)
        }

        async generateSeed(fileToUpload) {
            seedGeneratorStore.setProcessing()
            this.setState({ showDownload: false })

            try {
                await this.requestSeed(fileToUpload)
                await this.requestSpoiler()

                seedGeneratorStore.clearError()
            }
            catch (error) {
                seedGeneratorStore.setError('Whoops! Something went wrong!')
                this.setState({ showDownload: false })
                console.log(error)
            }
            finally {
                seedGeneratorStore.clearProcessing()
            }
        }

        async requestSeed(fileToUpload) {
            let formData = this.buildFormData(fileToUpload)

            const response = await fetch('api/seed', {
                method: 'POST',
                body: formData
            })

            const name = this.parseResponse(response, 'filename')
            const seed = this.parseResponse(response, 'seed')
            const file = await response.blob()

            seedGeneratorStore.setSeed(seed)

            this.setState({
                showDownload: true,
                romUri: window.URL.createObjectURL(file),
                romName: name,
            })
        }

        async requestSpoiler() {
            const { seed } = seedGeneratorStore

            const response = await fetch(`api/seed/${seed}/spoiler`, {
                method: 'GET',
            })

            if (!response || !response.headers)
                return null

            const file = await response.blob()
            const name = this.parseResponse(response, 'filename')

            this.setState({
                spoilerUri: window.URL.createObjectURL(file),
                spoilerName: name
            })
        }

        render() {
            return (
                <Grid container spacing={2} style={styles.Root}>
                    <Grid item xs={6}><RomDetailsContainer /></Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}><VariantsContainer /></Grid>
                            <Grid item xs={12}><EnemizerContainer /></Grid>
                            <Grid item xs={12}><EntranceContainer /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
    }
)

export default SeedGenerator