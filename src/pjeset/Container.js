import React, { Component } from 'react';
import sizeMe from 'react-sizeme'
import './Container.css';


class Container extends Component{
	
	render(){
		return(
			<div className="container" onMouseMove={this.props.mousemove}>
				{this.props.children}
			</div>
		)
	}

}

export default sizeMe({ monitorHeight: true })(Container);