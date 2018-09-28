import React, { Component } from 'react';
import Horizontal from 'react-scroll-horizontal';
import { withBaseIcon } from 'react-icons-kit';
import {ic_chevron_left} from 'react-icons-kit/md/ic_chevron_left';
import {ic_chevron_right} from 'react-icons-kit/md/ic_chevron_right';
import Container from './Container.js';
import Item from './Item.js';
import { Link } from 'react-router-dom';
import './Template.css';

const ArrowIconContainer = 
    withBaseIcon({ size: 64, style: {color: '#E5E5E5'}})

class Template extends Component {
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
			<Item 
				src={thing.src} 
				name={thing.name} 
				date={thing.date} 
				place={thing.place} 
				key={index} 
				id={thing.id} 
				back={this.props.back} 
				title={this.props.title}
				details={this.props.details}
				tiled={false}
			/>
		);
		if ((this.state.width >= this.state.sw) || (this.state.width < 720)) {
			return (
				<Container h='70' mousemove={this.updateXY}>
					<div className="template">
						<span><Link style={{textDecoration: 'none'}} to={'/'+ backTo}><div className="back leftemerge2">{this.props.back}</div></Link></span>
						<span><h1 className="title emerge">{this.props.title}</h1></span>
						<div ref={this.main} className="main">
							<div className="icon icon_left"><ArrowIconContainer icon={ic_chevron_left}/></div>
								{listThings}
							<div className="icon icon_right"><ArrowIconContainer icon={ic_chevron_right}/></div>
						</div>
					</div>
				</Container>
			);
		} else {
			return (
				<Container h='70' mousemove={this.updateXY}>
					<div className="template">
					<span><Link style={{textDecoration: 'none'}} to={'/'+ backTo}><div className="back leftemerge2">{this.props.back}</div></Link></span>
						<span><h1 className="title emerge">{this.props.title}</h1></span>
						<div ref={this.main} className="main">
							<Horizontal reverseScroll={true}>
							<div className="icon icon_left"><ArrowIconContainer icon={ic_chevron_left}/></div>
								{listThings}
							<div className="icon icon_right"><ArrowIconContainer icon={ic_chevron_right}/></div>
							</Horizontal>
						</div>
					</div>
				</Container>
			);
		}
	}
}

Template.defaultProps = {
	back: '',
	title: '',
	name: '',
	place: '',
	src: '',
	date: ''
};

export default Template;