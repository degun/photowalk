import React, { Component } from 'react';
import Horizontal from 'react-scroll-horizontal';
import { withBaseIcon } from 'react-icons-kit';
import {ic_chevron_left} from 'react-icons-kit/md/ic_chevron_left';
import {ic_chevron_right} from 'react-icons-kit/md/ic_chevron_right';
import Container from './Container.js';
import Item from './Item.js';
import { Link } from 'react-router-dom';
import './Reel.css';

const ArrowIconContainer = 
    withBaseIcon({ size: 64, style: {color: '#E5E5E5'}})

class Reel extends Component {
	constructor(props) {
		super(props);
		this.main = React.createRef();
		this.state = {
			sw: 0,
			width: 0,
			hovered: false
		};
		this.mouseEntered = this.mouseEntered.bind(this);
		this.mouseLeft = this.mouseLeft.bind(this);
	}

	reloadComponent() {
		if (this.main.current && (this.state.sw !== this.main.current.scrollWidth)) {
			let w = this.main.current.offsetWidth;
			this.setState({ width: w });
		}
	}

	mouseEntered(){
		this.setState({hovered: true});
	}

	mouseLeft(){
		this.setState({hovered: false});
	}

	componentDidMount() {
		this.reloadComponent();
		window.addEventListener('resize', this.reloadComponent.bind(this));
	}

	componentDidUpdate() {
		if (this.main.current && (this.state.width !== this.main.current.offsetWidth)) {
			let w = this.main.current.offsetWidth;
			let s = this.main.current.scrollWidth;
			this.setState({
				width: w,
				sw: s
			});
		}
	
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.reloadComponent.bind(this));
	}
	
	render() {
		const things = this.props.things;
		let backTo = '';
		if(this.props.back){backTo = this.props.back.split(' ')[2].toLowerCase();}
		const listThings = things.map((thing, index) => 
			<img src={thing.src} />
		);

		return (
			<div id='reel'>
				<div className='left'></div>
				<div className='reel'>{listThings}</div>
				<div className='right'></div>
			</div>
		);
	}
}

Reel.defaultProps = {
	back: '',
	title: '',
	name: '',
	place: '',
	src: '',
	date: ''
};

export default Reel;