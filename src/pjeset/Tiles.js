import React, { Component } from 'react';
import ItemUpper from './ItemUpper.js';

import { Link } from 'react-router-dom';
import './Tiles.css';

class Tiles extends Component {
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
		if(this.props.back){backTo = this.props.back.split(' ')[2].toLowerCase();	
	}
		const listThings = things.map((thing, index) => 
			<ItemUpper 
				src={thing.src} 
				name={thing.name} 
				date={thing.date} 
				place={thing.place} 
				key={index} 
				id={thing.id} 
				back={this.props.back} 
				title={this.props.title}
				details={this.props.details}
			/>
		);

		return (
			<div className='cont'>
				<div className="tiles">
					<span><Link style={{textDecoration: 'none'}} to={'/'+ backTo}><div className="back leftemerge2">{this.props.back}</div></Link></span>
					<span><h1 className="title emerge">{this.props.title}</h1></span>
					<div ref={this.main} className="mainUpper">
						{listThings}
					</div>
				</div>
			</div>
		);
		
	}
}

Tiles.defaultProps = {
	back: '',
	title: '',
	name: '',
	place: '',
	src: '',
	date: ''
};

export default Tiles;