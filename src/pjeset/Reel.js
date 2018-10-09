import React, { Component } from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import Swipeable from 'react-swipeable';
import './Reel.css';

class Reel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sw: 0,
			width: 0,
			centerw: 0,
			nextw: 0,
			curImg: 0,
			images: [],
			loaded: false,
			scrollLeft: 0,
			imgw: []
		};
		this.reel = React.createRef();
		this.prevImg = this.prevImg.bind(this);
		this.nextImg = this.nextImg.bind(this);
	}

	reloadComponent() {
		let w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth;
		if (this.reel && (this.state.width !== x)) {
			this.setState({ width: x });
		}
		this.fillReel(this.state.imgw,this.state.curImg);
	}

	componentDidMount() {
		this.loadAsync();
		window.addEventListener('resize', this.reloadComponent.bind(this));
		setTimeout(() => {
			this.reloadComponent();
		}, 1);	
	}

	loadAsync(){
		const things = this.props.things;
		let loadasync = [], c=0;
		for(let j=0; j<things.length; j++){
			loadasync[j] = new Image();
			loadasync[j].src = things[j].src;
			let that = this;
			loadasync[j].onload = function(){
				c++;
				if(c===things.length-1){
					that.updateReel(things);
				}
			}
		}
		return things;
	}

	updateReel(things){
		let imgw = [];
		let that = this;
		for(let i=0; i<things.length; i++){
			let tempImg = new Image();
			let reelImgs = [];
			tempImg.src = things[i].src;
			tempImg.onload = function(){
				imgw.push({src: this.src, w: this.width, h: this.height});
				reelImgs = that.fillReel(imgw, that.state.curImg);
				that.setState({images: reelImgs});
			}
		}
		this.setState({imgw});
	}

	componentDidUpdate() {
		let w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x =   e.clientWidth || w.innerWidth || g.clientWidth;
		if (this.reel && (this.state.width !== x)) {
			this.setState({
				width: x
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.reloadComponent.bind(this));
	}

	getNextIndex(current, total){
		return current === total ? 0 : (current+1);
	}
	getPrevIndex(current, total){
		return current === 0 ? total : (current-1);
	}

	nextImg(){
		this.setState({curImg: this.getNextIndex(this.state.curImg,this.state.imgw.length-1)});
		this.updateReel(this.props.things);
	}

	prevImg(){
		this.setState({curImg: this.getPrevIndex(this.state.curImg,this.state.imgw.length-1)});
		this.updateReel(this.props.things);
	}

	handleKeyDown(e) {
		if (e.keyCode === 37) {
		  this.prevImg();
		} else if (e.keyCode === 39) {
		  this.nextImg();
		}
	  }

	scaledWidth(h,w){
		return Math.round((w*400)/h);
	}

	fillReel(list, s){
		let reel = [], dif =0, difr=0;
		if(list[s]){
			let w = this.state.width/2;
			let wreal = this.scaledWidth(list[s].h,list[s].w);
			let w1= wreal/2;
			reel.push(list[s].src);
			this.setState({centerw: wreal});
			console.log('half of width: '+ w);
			console.log('half of centerw: '+ w1);
			console.log('centerw: '+ wreal);
			console.log('curImg: '+ list[s].src);
			let leftw = w1, rightw = w1, max = list.length-1;
			let l=this.getPrevIndex(s, max), r=this.getNextIndex(s, max);
			dif = w - leftw;
			let counterLeft = 0, counterRight = 0;
			while(dif > 0){
				reel.unshift(list[l].src);
				counterLeft++;
				wreal = this.scaledWidth(list[l].h,list[l].w);
				console.log('unshifted: ' + counterLeft + ' '+ wreal);
				leftw += wreal;
				l = this.getPrevIndex(l, list.length-1);
				dif = w - leftw;
			}
			difr = w - rightw;
			while(difr > 0){
				reel.push(list[r].src);
				counterRight++;
				console.log('pushed: ' + counterRight + ' '+ wreal);
				wreal = Math.round((list[l].h*400)/list[l].w);
				rightw += wreal;
				r = this.getNextIndex(r, list.length-1);
				difr = w - rightw;
			}
			let sl = w - leftw;	
			console.log('leftw: '+ leftw);
			console.log('scrollLeft: '+ sl);
			console.log('_____________________________');
			this.setState({scrollLeft: Math.abs(sl)});				
		}
		
		return reel;
	}

	render() {
		let backTo = '';
		if(this.props.back){backTo = this.props.back.split(' ')[2].toLowerCase();};
		const listThings = this.state.images.map((imazh, index) => 
			<img key={index} src={imazh} alt='part of the album' />
		);
		let blackw = (this.state.width - this.state.centerw)/2;
		setTimeout(() => {
			this.reel.current.scrollLeft = this.state.scrollLeft;
		}, 1);
		return (
			<Container onKeyDown={this.handleKeydown}>
				<div className="template">
					<span><Link style={{textDecoration: 'none'}} to={'/'+ backTo}><div className="back leftemerge2">{this.props.back}</div></Link></span>
					<span><h1 className="title emerge">{this.props.title}</h1></span>
					<div className='reel'>
						<div style={{width: blackw+'px'}} className='left' onClick={this.prevImg}>
							<div className='lilSquare'>
								<div className='containArrow'><div className='arrowLeft'></div></div>
							</div>
						</div>
						
						<Swipeable
							onSwipingLeft={this.nextImg}
							onSwipingRight={this.prevImg} 
						>
							<div className='imgs' ref={this.reel} >
								{listThings}
							</div>
						</Swipeable>
						
						<div style={{width: blackw+'px'}} className='right' onClick={this.nextImg}>
							<div className='lilSquare'>
							<div className='containArrow'><div className='arrowRight'></div></div>
							</div>
						</div>
					</div>
				</div>
			</Container>
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