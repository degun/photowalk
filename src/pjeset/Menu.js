import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sizeMe from 'react-sizeme';
import logo from '../imazhe/logo.png';
import menu from './menu.svg';
import close from './close.png';
import './Menu.css';


class Menu extends Component{
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
		const { width } = this.props.size;

		const menus = this.props.menus;

		const menuWeb = menus.map((menu, index) => 
			<Link key={index} to={'/' + menu}>{menu.charAt(0).toUpperCase() + menu.slice(1)}</Link>
		);

		const menuMobile = menus.map((menu, index) => 
			<Link key={index} onClick={this.toggleMenu} className={this.state.menuopen ? 'mobileitem o': 'mobileitem'} to={'/' + menu}>{menu.charAt(0).toUpperCase() + menu.slice(1)}</Link>
		);

		if (width>1000) {
			return(
				<header>
					<div  className="logoContainer">
						
					</div>
					<nav className="menuweb">
						<Link to="/" className="logoInside">
							<img src={logo} className="logo" alt="logo" />
						</Link>
						{menuWeb}
					</nav>
					<a className="menuIconContainer"> </a>
				</header>
		);}else{
			return(
				<header>
					<div className={this.state.menuopen ? 'skic open': 'skic'}></div>
					<nav className={this.state.menuopen ? 'menumobile dis': 'menumobile'}>
						<div className="topmenu">
							<a onClick={this.toggleMenu} className="closeIconContainer">
								<img src={close} className='close' alt="close" />
							</a>
						</div>
						<Link onClick={this.toggleMenu} className={this.state.menuopen ? 'mobileitem o': 'mobileitem'} to="/">Home</Link>
						{menuMobile}
					</nav>
					<a href="/" className="logoContainer">
						<img src={logo} className="logo" alt="logo" />
					</a>
					<nav className="menuweb"></nav>
					<a onClick={this.toggleMenu} className="menuIconContainer">
						<img src={menu} className="menuItem menuLogo" alt="menu" />
					</a>
				</header>
			);
		}
	}

}

export default sizeMe({ monitorHeight: true })(Menu);