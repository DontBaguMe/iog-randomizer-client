import React, { forwardRef } from 'react'
import { Grid, Paper } from '@material-ui/core'
import MaterialTable, { Icons } from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

import { Spoiler } from '../../models/rom/spoiler'

interface Props {
    data: Spoiler
}

const style = {
    container: {
        padding: '10px',
        marginBottom: '5px',
    },
    label: {
        fontWeight: 600,
    },
    items: {
        paddingTop: 5,
    },
}

function KeyValueRenderer(props: { name: string; value: string }) {
    return (
        <Grid container>
            <Grid item xs>
                <span style={style.label}>{props.name}:</span>
            </Grid>
            <Grid item xs>
                <span>{props.value}</span>
            </Grid>
        </Grid>
    )
}

function KeyValuesRenderer(props: { name: string; values: any[] }) {
    return (
        <Grid container>
            <Grid item xs>
                <span style={style.label}>{props.name}:</span>
            </Grid>
            <Grid item xs>
                {props.values.map((value, index) => (
                    <span key={index}>
                        {value}
                        {index < props.values.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </Grid>
        </Grid>
    )
}

export default function SpoilerView(props: Props) {
    const tableIcons: Icons = {
        Add: forwardRef((props, ref) => <AddBox {...props} />),
        Check: forwardRef((props, ref) => <Check {...props} />),
        Clear: forwardRef((props, ref) => <Clear {...props} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} />),
        Edit: forwardRef((props, ref) => <Edit {...props} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} />),
        Search: forwardRef((props, ref) => <Search {...props} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} />),
    }

    return (
        <>
            <Paper style={style.container}>
                <KeyValueRenderer name="Kara Location" value={props.data.kara_location} />
                <KeyValuesRenderer name="Status Required" values={props.data.statues_required} />
                <KeyValuesRenderer name="Boss Order" values={props.data.boss_order} />
                <KeyValuesRenderer name="Jeweler Amounts" values={props.data.jeweler_amounts} />
                <KeyValuesRenderer name="Inca Tiles" values={props.data.inca_tiles} />
                <KeyValuesRenderer name="Hieroglyph Order" values={props.data.hieroglyph_order} />
            </Paper>
            <MaterialTable
                style={{ maxWidth: '100%' }}
                title="Items"
                columns={[
                    { title: 'Location', field: 'location' },
                    { title: 'Item Name', field: 'name' },
                ]}
                data={props.data.items}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 10,
                }}
            />
        </>
    )
}
