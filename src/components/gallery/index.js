import React from 'react';
import { Container } from "shards-react";
import pixel from "./pixel.gif";
import './style.scss';

class Gallery extends React.Component {
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
	gridLoad() {
		this.props.list.forEach(item => {
			if (!item.state) {
				const image = new Image();
	
				image.src = item.url;

				item.state = 'loading';
				console.log(item.state)
				image.onload = () => {
					item.state = 'load';
					this.forceUpdate();
				}
			}
		});
	}
	render() {
		return <div className="gallery">
			<Container>
				<div className="list">
					{this.props.list.map((image, i) => <div className={image.state === 'load' ? "item" : "item loading"} obj={image} key={i} >
						<img src={image.state === 'load' ? image.url : pixel} alt="" />
					</div>)}
				</div>
			</Container>
		</div>;
	}
}

export default Gallery;