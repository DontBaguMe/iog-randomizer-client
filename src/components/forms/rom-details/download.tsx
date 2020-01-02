import React, { Fragment } from 'react'
import { observer } from 'mobx-react'

import { Button } from 'shards-react'
import romService from '../../../services/rom'
import romStore from '../../../stores/rom'

const styles = {
    Button: {
        marginRight: 10,
    },
}

@observer
export default class DownloadForm extends React.PureComponent {
    constructor(props: {}) {
        super(props)

        this.handleDownloadRom = this.handleDownloadRom.bind(this)
        this.handleDownloadSpoiler = this.handleDownloadSpoiler.bind(this)
    }

    handleDownloadRom() {
        romService.removeHeader()

        const blob = romService.createPatchedRomBlob()
        this.generateLink(blob, romStore.patchName)
    }

    handleDownloadSpoiler() {
        const blob = romService.createSpoilerBlob()
        this.generateLink(blob, romStore.spoilerName)
    }

    private generateLink(blob: Blob, name: string): void {
        let a = document.createElement('a')

        document.body.appendChild(a)
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        a.download = name
        a.click()
        a.remove()
    }

    render() {
        const { patchData, spoilerData } = romStore

        if (patchData) {
            return (
                <Fragment>
                    <Button color="primary" onClick={this.handleDownloadRom} style={styles.Button}>
                        Download Randomized ROM
                    </Button>
                    {spoilerData && (
                        <Button color="primary" onClick={this.handleDownloadSpoiler} style={styles.Button}>
                            Download Spoiler
                        </Button>
                    )}
                </Fragment>
            )
        }

        return null
    }
}
