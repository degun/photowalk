import React, { Component } from 'react';
import './ImazhMove.css';


class ImazhMove extends Component{
	
	render(){
		const imazh = {
			backgroundImage: 'url('+this.props.src+')',
			width: this.props.width,
			height: this.props.height,
			top: this.props.top,
			bottom: this.props.bottom,
			left: this.props.left,
			right: this.props.right
		};

		return(
			<div className={this.props.class}>
				<div style={imazh} className="imazh" />
			</div>
		);
	}

}

ImazhMove.defaultProps = {
		top: 'unset',
		bottom: '20%',
		left: '60%',
		right: 'unset',
		height: 'auto',
		width: 'auto'
	};


export default ImazhMove;