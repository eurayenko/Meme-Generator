import React, { Component } from 'react';

class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			randomImage: 'http://i.imgflip.com/1bij.jpg'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json()
				.then(data => {
					this.setState({allMemeImgs: data.data.memes});
		}));
	};

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		event.preventDefault();
		const random = Math.floor(Math.random() * this.state.allMemeImgs.length)
		const randomMeme = this.state.allMemeImgs[random].url;
		this.setState({randomImage: randomMeme});
	}

	render() {
		window.state = this.state
		return(
			<div>
				<form className="meme-form">
                	<input 
                		type="text" 
                		name="topText" 
                		placeholder="Top Text"
                		value={this.state.topText} 
                		onChange={this.handleChange}
                	/>
                	<input 
                		type="text" 
                		name="bottomText" 
                		placeholder="Bottom Text"
                		value={this.state.bottomText} 
                		onChange={this.handleChange}
                	/>
                    <button onClick={this.handleSubmit}>Gen</button>
                </form>
                <div className="meme">
                    <img align="center" src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
			</div>
		);
	};
}

export default MemeGenerator;
