import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'

import { Tooltip } from '@material-ui/core'
import { mysteryStore } from '../../../stores/mystery'

function UploadMysteryForm() {
    const weekly = mysteryStore.Weights.Weekly

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader()
        reader.onloadend = (f: ProgressEvent<FileReader>) => {
            const buffer: string = f.target.result as string
            const read_weights = JSON.parse(buffer)
            for (var property in weekly) {
                if (property in read_weights) {
                    for (var category in weekly[property]) {
                        if (category in read_weights[property]) {
                            mysteryStore.Weights.Weekly[property][category] = read_weights[property][category]
                        }
                        else {
                            mysteryStore.Weights.Weekly[property][category] = 0.0
                        }
                    }
                }
            }
        }

        reader.readAsText(event.target.files[0])
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Custom weights</InputGroupText>
            </InputGroupAddon>
            <Tooltip key="0" title="Select a mystery weight file." placement="bottom-start">
                <input required className="form-control" id="mystery-file" type="file" onChange={(e) => onFileChange(e)} accept=".json" />
            </Tooltip>
        </InputGroup>
    )
}

export default observer(UploadMysteryForm)
