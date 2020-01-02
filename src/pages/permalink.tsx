import React from 'react'
import { match, Redirect } from 'react-router-dom'
import { Modal, DialogContent } from '@material-ui/core'
import { observer } from 'mobx-react'

import uiStore from '../stores/ui'
import romStore from '../stores/rom'

import seedService from '../services/seed'
import PleaseWait from '../components/modals/please-wait'

// import RomDetailsContainer from '../components/containers/rom-details'
// import EnemizerContainer from '../components/containers/enemizer'
// import VariantsContainer from '../components/containers/variants'
// import EntranceContainer from '../components/containers/entrance'

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

@observer
export default class PermalinkPage extends React.PureComponent<RoutableProps> {
    public async componentDidMount(): Promise<void> {
        const match = this.props.match

        if (!match.params.id) {
            uiStore.setError(true, "This permalink doesn't exist!")
            return
        }

        try {
            uiStore.setProcessing(true)
            await seedService.requestPermalinkedSeed(match.params.id)
        } catch (err) {
            uiStore.setError(true, "This permalink doesn't exist!")
            return
        } finally {
            uiStore.setProcessing(false)
        }
    }

    public render(): JSX.Element {
        const { isError, isProcessing } = uiStore
        const hasBaseRom = romStore.hasBaseRom()

        if (isError) return <Redirect to={{ pathname: '/' }} />
        if (isProcessing)
            return (
                <Modal open={true} onClose={() => {}} style={Style.Modal}>
                    <DialogContent style={Style.Content}>
                        <PleaseWait message="Loading your seed!" />
                    </DialogContent>
                </Modal>
            )

        return <></>
    }
}
