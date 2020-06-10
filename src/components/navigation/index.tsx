import React, { useState, useEffect } from 'react'
import { Collapse, Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react'
import { FaGithub, FaDiscord } from 'react-icons/fa'

import logo from '../../assets/logo.png'
import './navigation.css'

import { observer } from 'mobx-react'
import versionService from '../../services/version'

const style = {
    Root: {
        flexGrow: 1,
    },
    Navigation: {
        backgroundColor: '#0060D6',
        paddingTop: 0,
        paddingBottom: 0,
        width: '100%',
    },
    Logo: {
        height: 115,
    },
    Menu: {
        fontSize: '1.1em',
    },
    Version: {
        color: '#FFFFFF',
    },
    Icon: {
        fontSize: '14pt',
    },
}

function Navigation() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [collapseOpen, setCollapseOpen] = useState(false)
    const [apiVersion, setApiVersion] = useState('0.0.0')

    useEffect(() => {
        async function getApiVersion() {
            const result = await versionService.requestVersion()
            if (result) setApiVersion(result)
        }
        getApiVersion()
    }, [])
    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen)
    }

    function toggleNavbar() {
        setCollapseOpen(!collapseOpen)
    }

    const environment = process.env.REACT_APP_IOGR_ENV.toLocaleLowerCase() === 'prod' ? '' : `(${process.env.REACT_APP_IOGR_ENV})`

    return (
        <Navbar type="dark" style={style.Navigation} expand="md">
            <NavbarBrand href="/">
                <img src={logo} style={style.Logo} alt="Illusion of Gaia Randomizer Logo" />
            </NavbarBrand>
            <NavbarBrand>
                <div className="versionContainer">
                    <span className="versionIdentifier">
                        API Version: v{apiVersion} {environment}
                    </span>
                    <span style={style.Version}>Client Version: v{process.env.REACT_APP_IOGR_CLIENT_VERSION}</span>
                </div>
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} aria-label="Toggle Nav Menu" />
            <Collapse open={collapseOpen} navbar>
                <Nav navbar className="ml-auto">
                    <Dropdown open={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle nav caret style={style.Menu}>
                            Help
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={() => (window.location.href = process.env.REACT_APP_IOGR_README_URI)}>Readme</DropdownItem>
                            <DropdownItem onClick={() => (window.location.href = process.env.REACT_APP_IOGR_LICENSE_URI)}>License</DropdownItem>
                            <DropdownItem onClick={() => (window.location.href = 'https://www.github.com/dontbagume/iogr/issues')}>Submit an Issue</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavItem>
                        <NavLink href="https://www.github.com/dontbagume/iogr">
                            <FaGithub size={36} />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={process.env.REACT_APP_IOGR_DISCORD}>
                            <FaDiscord size={36} />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}
export default observer(Navigation)
