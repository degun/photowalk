import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import close from './close.png';
import './Menu.css';


class Menuweb extends Component{
	constructor(props){
		super(props);
		this.state = {
			menuopen: false
		};
		this.toggleMenu = this.toggleMenu.bind(this);
	}

    toggleMenu() {
        const currentState = this.state.menuopen;
        this.setState({ menuopen: !currentState });
	}
	
	render(){
		const menus = this.props.menus;

		const menuWeb = menus.map((menu, index) => 
			<Link key={index} to={'/' + menu}>{menu.charAt(0).toUpperCase() + menu.slice(1)}</Link>
		);

		return(
			<Container h='100' mousemove={this.updateXY}>
				{menuWeb}
			</Container>
		);
		
	}

}

export default sizeMe({ monitorHeight: true })(Menuweb);