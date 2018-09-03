import React, { Component } from 'react';
import Container from '../pjeset/Container.js';
import './Contact.css';


class Contact extends Component{
	
	render(){
		return(
			<Container h='70' mousemove={this.updateXY}>
				<div className="contactContainer">
					<span><div className="back"></div></span>
					<span><h1 className="title emerge">Contact</h1></span>
					<form>
						<input name="name" placeholder="Name" />
						<input name="email" placeholder="E-mail" />
						<textarea name="message" placeholder="Your message" cols="50" rows="10">
						</textarea>
						<div className="btn">
							<button type="submit" value="Submit">Submit</button>
						</div>
					</form>	
				</div>	
			</Container>
		);

	}

}

Contact.defaultProps = {
		back: '',
		title: ''
	};


export default Contact;