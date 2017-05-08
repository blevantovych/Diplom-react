import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import Hamburger from 'material-ui/svg-icons/navigation/menu';

const Menu = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><Hamburger color={'white'}/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="МНК" onTouchTap={() => props.onMenuChange(1)} />
        <MenuItem primaryText="Мінімакс" onTouchTap={() => props.onMenuChange(2)} />
        <MenuItem primaryText="Порівняти Мінімакс і МНК" onTouchTap={() => props.onMenuChange(3)} />
        <MenuItem primaryText="Історія" onTouchTap={() => props.onMenuChange(4)} />
        <MenuItem primaryText="МНК (дискретна функція)" onTouchTap={() => props.onMenuChange(5)} />
    </IconMenu>
);

class Header extends Component {
    
    render() {
        return (
            <AppBar
                style={{position: 'fixed', top: 0, width: '60vw'}}
                title={this.props.title}
                showMenuIconButton={false}
                iconElementRight={<Menu onMenuChange={this.props.onMenuChange} />}
            />
        );
    }
}

export default Header;