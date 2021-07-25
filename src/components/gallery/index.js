import React from 'react';
import { Container } from "shards-react";
import pixel from "./pixel.gif";
import './style.scss';

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: {}
		}
	}
	componentDidMount() {
		this.grid();
		window.addEventListener('resize', this.grid);

	}
	componentDidUpdate() {
		this.grid();
		this.gridLoad();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.grid);
	}
	grid() {
		const list = document.querySelector('.list');

		let cols = Math.round(list.offsetWidth / 300);

		if (cols < 2) {
			cols = 2;
		}

		const imgs = document.querySelectorAll('img');
			
		let imgsArr = [];

		let width = 0;

		let count = 0;

		imgs.forEach((elem, index) => {
			elem.style.height = '';
		});
		
		imgs.forEach((elem, index) => {
			width += elem.offsetWidth;
			imgsArr.push(elem);
			count++;
			if (count === cols) {
				const coef = (list.offsetWidth - (cols + 1) * 10) / width;

				imgsArr.forEach((elem2, index2) => {
					elem2.style.height = `${elem2.offsetHeight * coef}px`;
				})
				width = 0;
				count = 0;
				imgsArr = [];
			}
		});
	}
	thisList = null
	gridLoad() {
		this.props.gallery.toArray().forEach(item => {

			if (!this.state.loaded[item.id]) {
				const image = new Image();

				this.setState(prevState => ({
					loaded: {
						...prevState.loaded,
						[item.id]: {
							id: item.id,
							state: 'loading',
						}
					}
				}));
	
				image.src = item.url;

				image.onload = () => {
					this.setState(prevState => ({
						loaded: {
							...prevState.loaded,
							[item.id]: {
								...prevState.loaded[item.id],
								state: 'load',
							}
						}
					}));
				}
			}
		});
	}
	render() {
		return <div className="gallery">
			<Container>
				<div className="list">
					{this.props.gallery.toArray().map((image, i) => <div className={this.state.loaded[image.id] ? (this.state.loaded[image.id].state === 'load' ? "item" : "item loading") : null} obj={image} key={i} >
						<img src={this.state.loaded[image.id] ? (this.state.loaded[image.id].state === 'load' ? image.url : pixel) : pixel} alt="" />
						<button onClick={() => this.props.gallery.delete(image.id)} className="item__remove"></button>
					</div>)}
				</div>
			</Container>
		</div>;
	}
}

export default Gallery;