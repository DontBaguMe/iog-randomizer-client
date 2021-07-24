import React, { useState } from 'react'
import { Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react'
import { useHistory } from 'react-router-dom'

const style = {
    Menu: {
        fontSize: '1.1em',
    },
}

export function GenerateDropdown() {
    const history = useHistory()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <Nav navbar className="ml-auto">
            <Dropdown open={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret style={style.Menu}>
                    Generate Game
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => history.push('/')}>Generate Randomized Game</DropdownItem>
                    <DropdownItem onClick={() => history.push('/mystery')}>Generate Mystery Randomized Game</DropdownItem>
                    <DropdownItem onClick={() => history.push('/customizer')}>Create your own Game</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Nav>
    )
}
