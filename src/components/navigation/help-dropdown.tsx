import React, { useState } from 'react'
import { Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react'

const style = {
    Menu: {
        fontSize: '1.1em',
    },
}

export function HelpDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <Nav navbar className="ml-auto">
            <Dropdown open={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret style={style.Menu}>
                    Help
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => (window.location.href = process.env.REACT_APP_IOGR_README_URI)}>Readme</DropdownItem>
                    <DropdownItem onClick={() => (window.location.href = process.env.REACT_APP_IOGR_LICENSE_URI)}>License</DropdownItem>
                    <DropdownItem onClick={() => (window.location.href = 'https://github.com/DontBaguMe/IoGR/issues/new/choose')}>Submit an Issue</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Nav>
    )
}
