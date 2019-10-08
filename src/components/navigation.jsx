import React from 'react'
import { Collapse, Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'
import logo from '../assets/logo.png'

const style = {
    Root: {
        flexGrow: 1
    },
    Navigation: {
        backgroundColor: '#0060D6',
        paddingTop: 0,
        paddingBottom: 0
    },
    Logo: {
        height: '115px'
    },
    Menu: {
        fontSize: "1.1em"
    },
    Version: {
        color: '#FFFFFF',
    },
    Icon: {
        fontSize: "14pt"
    }
}

export default class Navigation extends React.Component {
    state = {
        dropdownOpen: false,
        collapseOpen: false,
        redirect: false,
        target: null
    }

    constructor(props) {
        super(props)

        this.toggleDropdown = this.toggleDropdown.bind(this)
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.handleDropdownClick = this.handleDropdownClick.bind(this)        
    }

    toggleDropdown() {
        this.setState({
            ...this.state,
            ...{
                dropdownOpen: !this.state.dropdownOpen
            }
        });
    }

    toggleNavbar() {
        this.setState({
            ...this.state,
            ...{
                collapseOpen: !this.state.collapseOpen
            }
        });
    }

    handleDropdownClick(route) {
        this.setState({
            redirect: true,
            target: route
        }, () => { console.log('Dropdown state set', this.state.redirect)})
    }

    render() {
        const { redirect, target } = this.state
        
        if (redirect)
            return <Redirect to={target} push={true} />
        
        return (
            <Navbar type="dark" style={style.Navigation} expand="md">
                <NavbarBrand href="/"><img src={logo} style={style.Logo} alt="Illusion of Gaia Randomizer Logo" /></NavbarBrand>
                <NavbarBrand style={style.Version}>v{process.env.REACT_APP_IOGR_API_VERSION}</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse open={this.state.collapseOpen} navbar>
                    <Nav navbar className="ml-auto">
                        <Dropdown open={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle nav caret style={style.Menu}>
                                Help
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => window.location.href = process.env.REACT_APP_IOGR_README_URI}>Readme</DropdownItem>
                                <DropdownItem onClick={() => window.location.href = process.env.REACT_APP_IOGR_LICENSE_URI}>License</DropdownItem>
                                <DropdownItem onClick={() => window.location.href = "https://www.github.com/dontbagume/iogr/issues"}>Submit an Issue</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem><NavLink href="https://www.github.com/dontbagume/iogr"><FaGithub size={36} /></NavLink></NavItem>
                        <NavItem><NavLink href={process.env.REACT_APP_IOGR_DISCORD}><FaDiscord size={36} /></NavLink></NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}