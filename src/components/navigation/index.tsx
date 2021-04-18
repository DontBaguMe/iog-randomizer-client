import React, { useState, useEffect } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'shards-react'
import { FaGithub, FaDiscord } from 'react-icons/fa'

import logo from '../../assets/logo.png'
import './navigation.css'

import { observer } from 'mobx-react'
import versionService from '../../services/version'
import { HelpDropdown } from './help-dropdown'
import { GenerateDropdown } from './generate-dropdown'

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
    const [apiVersion, setApiVersion] = useState('0.0.0')

    useEffect(() => {
        async function getApiVersion() {
            const result = await versionService.requestVersion()
            if (result) setApiVersion(result)
        }
        getApiVersion()
    }, [])

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
            <Nav navbar className="ml-auto">
                <GenerateDropdown />
                <HelpDropdown />
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
        </Navbar>
    )
}
export default observer(Navigation)
