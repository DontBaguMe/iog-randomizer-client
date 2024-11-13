import React, {useEffect, useState} from 'react'
import {match, Redirect, useParams} from 'react-router-dom'
import {DialogContent, Divider, Grid, Modal, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'
import moment from 'moment-timezone'
//import AccordionPanel from '../components/containers/accordion-panel'
import Error from '../components/modals/error'
import PleaseWait from '../components/modals/please-wait'
import seedService from '../services/seed'
import {PermalinkedRom} from '../models/rom/permalinked-rom'
import {Difficulty} from '../models/ui/diffiulty'
import {Goal} from '../models/ui/goal'
import {StatuesReq} from '../models/ui/statues-req'
import {StartingLocation} from '../models/ui/starting-location'
import {EntranceShuffle} from '../models/ui/entrance-shuffle'
import {Enemizer} from '../models/ui/enemizer'
import PermalinkSettingsContainer from '../components/containers/permalink-settings'
import PermalinkHashDisplay from '../components/containers/permalink-hash'
import {Logic} from '../models/ui/logic'
import PermalinkActionsContainer from '../components/containers/permalink-actions'
import AccordionPanel from '../components/containers/accordion-panel'
import SpoilerView from '../components/containers/spoiler'
import uiStore from '../stores/ui'
import PreferencesContainer from '../components/containers/preferences'
import {Darkrooms} from "../models/ui/darkrooms";
import {Flute} from "../models/ui/flute";

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
        return <Redirect to={{pathname: '/'}}/>
    }

    if (error) {
        return (
            <Modal open={error != null} onClose={() => redirectToHome()} style={Style.Modal}>
                <DialogContent style={Style.Content}>
                    <Error message="This permalink does not exist"/>
                </DialogContent>
            </Modal>
        )
    }

    if (uiStore.isError) {
        return (
            <Modal open={uiStore.isError} onClose={() => uiStore.setError(false)} style={Style.Modal}>
                <DialogContent style={Style.Content}>
                    <Error message={uiStore.errorText}/>
                </DialogContent>
            </Modal>
        )
    }

    if (isProcessing) {
        return (
            <Modal open={error != null} onClose={() => redirectToHome()} style={Style.Modal}>
                <DialogContent style={Style.Content}>
                    <PleaseWait message="Hang tight! Hamlet is fetching your seed!"/>
                </DialogContent>
            </Modal>
        )
    }
    return (
        <Grid container>
            <Grid item xs={6} style={{padding: 20}}>
                <Paper elevation={3} style={{padding: 10}}>
                    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                        <PermalinkSettingsContainer title="Rom Details" settings={buildRomDetailsArea()}
                                                    hidden={false}/>
                        <Divider/>
                        <PermalinkSettingsContainer title="Spoilers" settings={buildSpoilerDetailsArea()}
                                                    hidden={false}/>
                        <Divider hidden={rom?.settings === null}/>
                        <PermalinkSettingsContainer title="Variants" settings={buildVariantsArea()}
                                                    hidden={rom?.settings === null}/>
                        <Divider hidden={rom?.settings === null}/>
                        <PermalinkSettingsContainer title="Enemizer" settings={buildEnemizerArea()}
                                                    hidden={rom?.settings === null}/>
                        <Divider hidden={rom?.settings === null}/>
                        <PermalinkSettingsContainer title="Entrance" settings={buildEntranceArea()}
                                                    hidden={rom?.settings === null}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column', padding: 20}}>
                <Paper elevation={3} style={{padding: 10}}>
                    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                        <PermalinkHashDisplay hash_components={getSeedHash()}/>
                    </div>
                </Paper>
                <Paper elevation={3} style={{padding: 10}}>
                    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                        <PermalinkActionsContainer rom={rom}/>
                    </div>
                </Paper>
                <PreferencesContainer rom={rom} style={{paddingTop: 10}}/>
                {rom.patch.spoilerFilename && (
                    <AccordionPanel id="spoilerLog" title="Spoiler" expanded={false} style={{paddingTop: 10}}>
                        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%'}}>
                            <SpoilerView data={rom.patch.spoilerData}/>
                        </div>
                    </AccordionPanel>
                )}
            </Grid>
        </Grid>
    )

    function getSeedHash() {
        const hash_len = 6
        const hash_start_address = 121432
        const hash_end_address = hash_start_address + hash_len
        const hash_patch = rom.patch.patchData.find((element) => {
            let start_addr = element.address
            let end_addr = start_addr + element.data.length

            return (start_addr <= hash_start_address && end_addr >= hash_end_address)
        })
        if (hash_patch === undefined) {
            // Special case for retro compatibility with pre 4.7.2 seeds
            return rom.patch.patchData.find(element => element.address === 121431).data
        }
        // post 4.7.2 seeds have a ":" in the rando code text that require a shift
        return hash_patch.data.slice(hash_start_address - hash_patch.address, hash_end_address - hash_patch.address)
    }

    function buildRomDetailsArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []

        settings.push({key: 'Permalink ID', value: rom.id})
        settings.push({key: 'Created At', value: moment(rom.created_at).local().format('LLLL')})
        if (rom.settings != null) {
            if (rom.settings.race_mode === true) settings.push({key: 'Seed', value: rom.settings.seed.toString()})
            settings.push({key: 'Difficulty', value: Difficulty[rom.settings.difficulty]})

            const goal: Goal = rom.settings.goal
            settings.push({key: 'Goal', value: Goal[goal]})
            if (goal !== Goal.RedJewelHunt) settings.push({key: 'Statues', value: rom.settings.statues})
            if (goal !== Goal.RedJewelHunt) settings.push({
                key: 'Statues Source',
                value: StatuesReq[rom.settings.statue_req]
            })

        }

        return settings
    }

    function buildSpoilerDetailsArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []
        if (rom.returnedSpoiler != null) settings.push({
            key: 'Spoiler at generation',
            value: String(rom.returnedSpoiler)
        })
        settings.push({key: 'Spoiler in permalink', value: String(rom.patch.spoilerData != null)})
        return settings
    }

    function buildVariantsArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []
        if (rom?.settings === null) {
            return settings
        }
        settings.push({key: 'Starting Location', value: StartingLocation[rom.settings.start_location]})
        settings.push({key: 'Logic', value: Logic[rom.settings.logic]})
        settings.push({key: 'Is Open World?', value: String(rom.settings.open_mode)})
        settings.push({key: 'Allow Glitches?', value: String(rom.settings.allow_glitches)})
        settings.push({key: 'One Hit Knockout?', value: String(rom.settings.ohko)})
        settings.push({key: 'Red Jewel Madness?', value: String(rom.settings.red_jewel_madness)})
        settings.push({key: 'Early Firebird?', value: String(rom.settings.firebird)})
        settings.push({key: 'Zelda 3 Mode?', value: String(rom.settings.z3)})
        if (rom.settings.infinite_inventory != null) settings.push({
            key: 'Infinite inventory?',
            value: String(rom.settings.infinite_inventory)
        })
        if (rom.settings.fluteless != null) settings.push({key: 'Fluteless ?', value: String(rom.settings.fluteless)})
        if (rom.settings.flute != null) settings.push({key: 'Flute ?', value: Flute[rom.settings.flute]})
        if (rom.settings.orb_rando != null) settings.push({key: 'Orb Rando ?', value: String(rom.settings.orb_rando)})
        if (rom.settings.darkrooms != null) settings.push({
            key: 'Dark Rooms ?',
            value: Darkrooms[rom.settings.darkrooms]
        })
        if (rom.settings.ds_warp != null) settings.push({key: 'Dark space warp ?', value: String(rom.settings.ds_warp)})

        return settings
    }

    function buildEnemizerArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []
        if (rom?.settings === null) {
            return settings
        }

        settings.push({key: 'Enemizer', value: Enemizer[rom.settings.enemizer]})
        settings.push({key: 'Boss Shuffle?', value: String(rom.settings.boss_shuffle)})

        return settings
    }

    function buildEntranceArea(): RenderableSetting[] {
        const settings: RenderableSetting[] = []
        if (rom?.settings === null) {
            return settings
        }

        settings.push({key: 'Overworld Shuffle?', value: String(rom.settings.overworld_shuffle)})
        settings.push({key: 'Dungeon Chaos?', value: String(rom.settings.dungeon_shuffle)})
        if (rom.settings.entrance_shuffle != null) settings.push({
            key: 'Entrance Shuffle?',
            value: EntranceShuffle[rom.settings.entrance_shuffle]
        })
        if (rom.settings.town_shuffle != null) settings.push({
            key: 'Town Shuffle?',
            value: String(rom.settings.town_shuffle)
        })
        if (rom.settings.coupled_exits != null) settings.push({
            key: 'Coupled entrances?',
            value: String(rom.settings.coupled_exits)
        })

        return settings
    }
}

export default observer(PermalinkPage)
