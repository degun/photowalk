import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import Container from '../pjeset/Container.js';
import ImazhMove from '../pjeset/ImazhMove.js';
import piramida from'../imazhe/piramida.png';
import girl from'../imazhe/girl.png';
import './Kryesore.css';


class Kryesore extends Component{
	constructor(props){
		super(props);
		this.state = {
			x: 0,
			y: 0
		};
		this.updateXY = this.updateXY.bind(this);
	}

	updateXY(e){
		this.setState({
			x: e.screenX,
			y: e.screenY
		});
	}

	componentDidMount(){
		document.addEventListener('onMouseMove', this.updateXY, false);
	}
	
	render(){
		const { width, height } = this.props.size;
		let moveX = Math.round((this.state.x /width)*15);
		let moveY = Math.round((this.state.y /height)*15);

		let gbcalc = 'calc(-20% + ' + moveY +  'px)';
		let grcalc = 'calc(15% - '+ moveX + 'px)';
		let pbcalc = 'calc(-30% + '+ moveX + 'px)';

		let h1style = {
			marginTop: moveY + 'px'
		};

		return(
			<Container h='100' mousemove={this.updateXY}>
				<ImazhMove class="piramida" src={piramida} bottom = {pbcalc} left={-moveX}  height='50%' width="100%" />
				<ImazhMove class="girl" src={girl} bottom = {gbcalc} right={grcalc}  height='70%' width="20%" />
				<div className="text">
					<h1 style={h1style}>PHOTOWALK TIRANA</h1>
					<p>The perfect reason to get out and shoot in this nature themed PhotoWalk! Join fellow photographers from Tirana for an afternoon of shooting and exploration. We will do our best to help you, and learn from each other. Whether you are a pro or just starting; whether you shoot with a DSLR or your phone; we would love to see you there!
					</p>
				</div>
			</Container>
		);
	}

}


export default sizeMe({ monitorHeight: true })(Kryesore);