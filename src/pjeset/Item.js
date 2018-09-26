import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			display: 'block'
		};
		this.mouseEntered = this.mouseEntered.bind(this);
		this.mouseLeft = this.mouseLeft.bind(this);
		this.goFullscreen = this.goFullscreen.bind(this);
	}

	isMobileDevice() {
		return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
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
		this.setState({display: 'none'});
		setTimeout(() => {
			this.setState({hovered: false});
			this.setState({display: 'block'});
		}, 150);
	}

	goFullscreen(event){
		var elem = event.target;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
			console.log('went fullscreen');
		}
		console.log('no fullscreen');
	}

	componentDidMount(){
		this.setState({hovered: false, display: 'block'});
	}
	
	render() {
		return (
		<div onMouseEnter={this.mouseEntered} onMouseLeave={this.mouseLeft} className="item" >
			<Link className="photolink" to={!this.props.back ? ('/'+this.props.title.toLowerCase()+'/:'+ this.props.id) : '#'}><img allowFullScreen src={this.props.src} alt={this.props.name} onClick={this.goFullscreen}/></Link>
			<div style={{display: this.props.details ? this.state.display : 'none', bottom: (this.isMobileDevice() || this.state.hovered) ? '49px' : '-100px'}}className="description">
				<Link to={(this.props.tiled) ? "" : (this.props.id ? "/photographers/:" + this.props.id : "")}><h4 className="name">{this.props.name + ' ↗'}</h4></Link>
				<div className="placedate">
					<h6 className="place">{this.props.place}</h6><em><h6 className="date">{this.props.date}</h6></em>
				</div>
			</div>
		</div>
		);

	}
}

Item.defaultProps = {
	name: '',
	place: '',
	src: '',
	date: '',
	index: '',
	back: ''
};

export default Item;