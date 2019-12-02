import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'shards-react'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'
import logo from '../assets/logo.png'
import uiStore from '../stores/ui'
import { observer } from 'mobx-react'

const style = {
    Root: {
        flexGrow: 1,
    },
    Navigation: {
        backgroundColor: '#0060D6',
        paddingTop: 0,
        paddingBottom: 0,
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

type State = {
    dropdownOpen: boolean
    collapseOpen: boolean
    redirect: boolean
    target: any
    environment: string
}

@observer
export default class Navigation extends React.PureComponent<{}, State> {
    constructor(props) {
        super(props)

        const environment =
            process.env.REACT_APP_IOGR_ENV.toLocaleLowerCase() === 'prod'
                ? ''
                : `(${process.env.REACT_APP_IOGR_ENV})`

        this.state = {
            dropdownOpen: false,
            collapseOpen: false,
            redirect: false,
            target: null,
            environment,
        }

        this.toggleDropdown = this.toggleDropdown.bind(this)
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.handleDropdownClick = this.handleDropdownClick.bind(this)
    }

    toggleDropdown() {
        this.setState({
            ...this.state,
            ...{
                dropdownOpen: !this.state.dropdownOpen,
            },
        })
    }

    toggleNavbar() {
        this.setState({
            ...this.state,
            ...{
                collapseOpen: !this.state.collapseOpen,
            },
        })
    }

    handleDropdownClick(route) {
        this.setState(
            {
                redirect: true,
                target: route,
            },
            () => {
                console.log('Dropdown state set', this.state.redirect)
            },
        )
    }

    render() {
        const { redirect, target } = this.state

        if (redirect) return <Redirect to={target} push={true} />

        return (
            <Navbar type="dark" style={style.Navigation} expand="md">
                <NavbarBrand href="/">
                    <img
                        src={logo}
                        style={style.Logo}
                        alt="Illusion of Gaia Randomizer Logo"
                    />
                </NavbarBrand>
                <NavbarBrand style={style.Version}>
                    v{uiStore.version}{' '}
                    {this.state.environment}
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse open={this.state.collapseOpen} navbar>
                    <Nav navbar className="ml-auto">
                        <Dropdown
                            open={this.state.dropdownOpen}
                            toggle={this.toggleDropdown}>
                            <DropdownToggle nav caret style={style.Menu}>
                                Help
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem
                                    onClick={() =>
                                        (window.location.href =
                                            process.env.REACT_APP_IOGR_README_URI)
                                    }>
                                    Readme
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() =>
                                        (window.location.href =
                                            process.env.REACT_APP_IOGR_LICENSE_URI)
                                    }>
                                    License
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() =>
                                        (window.location.href =
                                            'https://www.github.com/dontbagume/iogr/issues')
                                    }>
                                    Submit an Issue
                                </DropdownItem>
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
}
