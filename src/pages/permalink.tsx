import React, { useState, useEffect } from 'react'
import { match, useParams, Redirect } from 'react-router-dom'
import { Modal, DialogContent, Divider, Paper, Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import moment from 'moment-timezone'
//import AccordionPanel from '../components/containers/accordion-panel'
import Error from '../components/modals/error'
import PleaseWait from '../components/modals/please-wait'
import seedService from '../services/seed'
import { PermalinkedRom } from '../models/rom/permalinked-rom'
import { Difficulty } from '../models/ui/diffiulty'
import { Goal } from '../models/ui/goal'
import { StartingLocation } from '../models/ui/starting-location'
import { EntranceShuffle } from '../models/ui/entrance-shuffle'
import { Enemizer } from '../models/ui/enemizer'
import PermalinkSettingsContainer from '../components/containers/permalink-settings'
import { Logic } from '../models/ui/logic'
import PermalinkActionsContainer from '../components/containers/permalink-actions'
import AccordionPanel from '../components/containers/accordion-panel'
import SpoilerView from '../components/containers/spoiler'
import uiStore from '../stores/ui'
import PreferencesContainer from '../components/containers/preferences'

const Style = {
    Root: {
        minWidth: 500,
        marginTop: 40,
        maxWidth: '100vw',
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

interface Props {
    id: string
}

interface RoutableProps {
    required: string
    match?: match<Props>
}

interface RenderableSetting {
    key: string
    value: string
}

function PermalinkPage(props: RoutableProps) {
    const [error, setError] = useState(false)
    const [errorRedirect, setErrorRedirect] = useState(false)
    const [isProcessing, setIsProcessing] = useState(true)
    const [rom, setRom] = useState<PermalinkedRom | undefined>(undefined)

    const navParams: Props = useParams()

    useEffect(() => {
        const permalinkId = navParams.id
        if (!permalinkId) setError(true)
    }, [])

    useEffect(() => {
        async function getSeed() {
            try {
                const rom = await seedService.requestPermalinkedSeed(navParams.id)
                setRom(rom)
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setIsProcessing(false)
            }
        }

        getSeed()
    }, [])

    function redirectToHome() {
        setError(false)
        setErrorRedirect(true)
    }

    if (errorRedirect) {
        return <Redirect to={{ pathname: '/' }} />
    }

    if (error) {
        return (
            <Modal open={error != null} onClose={() => redirectToHome()} style={Style.Modal}>
                <DialogContent style={Style.Content}>
                    <Error message="This permalink does not exist" />
                </DialogContent>
            </Modal>
        )
    }

    if (uiStore.isError) {
        return (
            <Modal open={uiStore.isError} onClose={() => uiStore.setError(false)} style={Style.Modal}>
                <DialogContent style={Style.Content}>
                    <Error message={uiStore.errorText} />
                </DialogContent>
            </Modal>
        )
    }

    if (isProcessing) {
        return (
            <Modal open={error != null} onClose={() => redirectToHome()} style={Style.Modal}>
                <DialogContent style={Style.Content}>
                    <PleaseWait message="Hang tight! Hamlet is fetching your seed!" />
                </DialogContent>
            </Modal>
        )
    }

    return (
        <Grid container>
            <Grid item xs={6} style={{ padding: 20 }}>
                <Paper elevation={3} style={{ padding: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <PermalinkSettingsContainer title="Rom Details" settings={buildRomDetailsArea()} />
                        <Divider />
                        <PermalinkSettingsContainer title="Variants" settings={buildVariantsArea()} />
                        <Divider />
                        <PermalinkSettingsContainer title="Enemizer" settings={buildEnemizerArea()} />
                        <Divider />
                        <PermalinkSettingsContainer title="Entrance" settings={buildEntranceArea()} />
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
                <Paper elevation={3} style={{ padding: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <PermalinkActionsContainer rom={rom} />
                    </div>
                </Paper>
                <PreferencesContainer style={{ paddingTop: 10 }} />
                {rom.patch.spoilerFilename && (
                    <AccordionPanel id="spoilerLog" title="Spoiler" expanded={false} style={{ paddingTop: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%' }}>
                            <SpoilerView data={rom.patch.spoilerData} />
                        </div>
                    </AccordionPanel>
                )}
            </Grid>
        </Grid>
    )

    function buildRomDetailsArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []

        settings.push({ key: 'Permalink ID', value: rom.id })
        settings.push({ key: 'Created At', value: moment(rom.created_at).local().format('LLLL') })
        settings.push({ key: 'Seed', value: rom.settings.seed.toString() })
        settings.push({ key: 'Difficulty', value: Difficulty[rom.settings.difficulty] })

        const goal: Goal = rom.settings.goal
        settings.push({ key: 'Goal', value: Goal[goal] })
        if (goal !== Goal.RedJewelHunt) settings.push({ key: 'Statues', value: rom.settings.statues })

        return settings
    }

    function buildVariantsArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []

        settings.push({ key: 'Starting Location', value: StartingLocation[rom.settings.start_location] })
        settings.push({ key: 'Logic', value: Logic[rom.settings.logic] })
        settings.push({ key: 'Is Open World?', value: String(rom.settings.open_mode) })
        settings.push({ key: 'Allow Glitches?', value: String(rom.settings.allow_glitches) })
        settings.push({ key: 'One Hit Knockout?', value: String(rom.settings.ohko) })
        settings.push({ key: 'Red Jewel Madness?', value: String(rom.settings.red_jewel_madness) })
        settings.push({ key: 'Early Firebird?', value: String(rom.settings.firebird) })
        settings.push({ key: 'Zelda 3 Mode?', value: String(rom.settings.z3) })
        return settings
    }

    function buildEnemizerArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []

        settings.push({ key: 'Enemizer', value: Enemizer[rom.settings.enemizer] })
        settings.push({ key: 'Boss Shuffle?', value: String(rom.settings.boss_shuffle) })

        return settings
    }

    function buildEntranceArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []

        settings.push({ key: 'Overworld Shuffle?', value: String(rom.settings.overworld_shuffle) })
        settings.push({ key: 'Dungeon Shuffle?', value: String(rom.settings.dungeon_shuffle) })
        settings.push({ key: 'Entrance Shuffle?', value: EntranceShuffle[rom.settings.entrance_shuffle] })

        return settings
    }
}

export default observer(PermalinkPage)
