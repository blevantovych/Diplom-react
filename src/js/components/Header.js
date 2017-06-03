import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import Hamburger from 'material-ui/svg-icons/navigation/menu'


const Menu = (props) => (
    <IconMenu
        iconButtonElement={
            <IconButton><Hamburger color={'white'}/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Дискретний випадок"
            rightIcon={<ArrowDropRight />}
            menuItems={[
                <MenuItem primaryText="МНК" onTouchTap={() => props.onMenuChange(5)} />,
                <MenuItem primaryText="Мінімакс" onTouchTap={() => props.onMenuChange(6)} />,
                <MenuItem primaryText="Порівняти" onTouchTap={() => props.onMenuChange(7)} />,
             ]}
        />
        <MenuItem
            primaryText="Неперервний випадок"
            rightIcon={<ArrowDropRight />}
            menuItems={[
                <MenuItem primaryText="МНК" onTouchTap={() => props.onMenuChange(1)} />,
                <MenuItem primaryText="Мінімакс" onTouchTap={() => props.onMenuChange(2)} />,
                <MenuItem primaryText="Порівняти" onTouchTap={() => props.onMenuChange(3)} />,
            ]}
        />
        <MenuItem
            primaryText="Історія"
            onTouchTap={() => props.onMenuChange(4)}
        />
        <MenuItem
            primaryText="Як користуватися (pdf)"
        >
            <a id="download_desc_link" href="./program_description.pdf" download=""></a>
        </MenuItem>
     
    </IconMenu>
)

class Header extends Component {
    
    render() {

        return (
            <AppBar
                style={{position: 'fixed', top: 0, width: '60vw'}}
                title={this.props.title}
                showMenuIconButton={false}
                iconElementRight={<Menu onMenuChange={this.props.onMenuChange} />}
            />
        )
    }
}

export default Header