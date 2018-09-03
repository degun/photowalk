import React, { Component } from 'react';
import './ImazhEnter.css';


class Imazh extends Component{
	
	render(){
		const imazh = {
			backgroundImage: 'url('+this.props.src+')',
			width: this.props.width,
			height: this.props.height
		}

		return(
			<div className="parent">
				<div style={imazh} className="imazh" />
				<div className="overlay-black" />
				<div className="overlay-white" />
			</div>
		)
	}

}

export default Imazh;