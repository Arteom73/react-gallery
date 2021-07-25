import React from 'react';
import { Container, Row, Col, FormInput, Button } from "shards-react";
import './style.scss';

class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initial: 'state',
			inputValue: '',
		}
		this.uploadHandler = this.uploadHandler.bind(this);
		this.inputChange = this.inputChange.bind(this);
	}
	extensions = ['png', 'jpg', 'jpeg', 'gif']
	componentDidMount() {
		
	}
	inputChange(e) {
		this.setState(prevState => ({
			inputValue: e.target.value
		}));
	}
	uploadHandler() {
		if (this.getExtension(this.state.inputValue) === 'json') {
			fetch(this.state.inputValue)
				.then(response => response.json())
				.then(data => {
					data.galleryImages.forEach(imageObj => {
						this.props.add(imageObj.url);
					});

				});
		} else if(this.extensions.includes(this.getExtension(this.state.inputValue))) {
			this.props.add(this.state.inputValue);
		} else {
			console.log('error')
		}
	}
	getExtension(string) {
		const arr = string.split('.');

		return (arr[arr.length - 1]).toLowerCase();
	}
	render() {
		return <Container className="dr-example-container">
				<Row>
					<Col sm="12" lg="4"></Col>
					<Col sm="12" lg="4">
						<Row>
							<Col xs="8">
								<FormInput placeholder="" onChange={this.inputChange} />
							</Col>
							<Col xs="4">
								<Button onClick={this.uploadHandler}>Upload</Button>
							</Col>
						</Row>
						<div>
							<b>Например:</b> https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json
							<br />
							<b>Или:</b> https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964011.jpg
						</div>
					</Col>
					<Col sm="12" lg="4"></Col>
				</Row>
			</Container>;
	}
}

export default Upload;