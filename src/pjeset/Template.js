import React, { Component } from 'react';
import Horizontal from 'react-scroll-horizontal';
import Container from './Container.js';

import { Link } from 'react-router-dom';
import './Template.css';

class Template extends Component {
	constructor(props) {
		super(props);
		this.main = React.createRef();
		this.state = {
			sw: 0,
			width: 0
		};
	}

	reloadComponent() {
		if (this.main.current && (this.state.sw !== this.main.current.scrollWidth)) {
			let w = this.main.current.offsetWidth;
			this.setState({ width: w });
		}
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
			<div className="item" key={index}>
				<span><h4 className="name leftemerge">{thing.name}</h4></span>
				<div className="placedate">
					<span><h6 className="place leftemerge2">{thing.place}</h6></span><span><em><h6 className="date rightemerge">{thing.date}</h6></em></span>
				</div>
				<Link to={!this.props.back ? ('/'+this.props.title.toLowerCase()+'/:'+ thing.id) : '#'}><img title="scroll for more" src={thing.src} alt="album first" /></Link>
			</div>
		);
		if ((this.state.width >= this.state.sw) || (this.state.width < 720)) {
			return (
				<Container h='70' mousemove={this.updateXY}>
					<div className="template">
						<span><Link style={{textDecoration: 'none'}} to={'/'+ backTo}><div className="back emerge">{this.props.back}</div></Link></span>
						<span><h1 className="title emerge">{this.props.title}</h1></span>
						<div ref={this.main} className="main">
							{listThings}
						</div>
					</div>
				</Container>
			);
		} else {
			return (
				<Container h='70' mousemove={this.updateXY}>
					<div className="template">
					<span><Link style={{textDecoration: 'none'}} to={'/'+ backTo}><div className="back emerge">{this.props.back}</div></Link></span>
						<span><h1 className="title emerge">{this.props.title}</h1></span>
						<div ref={this.main} className="main">
							<Horizontal reverseScroll={true}>
								{listThings}
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