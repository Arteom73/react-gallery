import React from 'react';
import Gallery from '../gallery';
import Upload from '../upload';
import './style.scss';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initial: 'state',
			gallery: {
				list: [],
				add(arr) {
					this.setState(prevState => ({
						gallery: {
							...prevState.gallery,
							list: [
								...arr,
								...prevState.gallery.list,
							]
						}
					}));
				},
				remove() {
					console.log('remove')
					// this.setState(prevState => ({
					// 	gallery: {
					// 		...prevState.gallery,
					// 		list: {
					// 			...prevState.gallery.list,
					// 		}
					// 	}
					// }));
				},
			}
		}
		this.state.gallery.add = this.state.gallery.add.bind(this);
		this.state.gallery.remove = this.state.gallery.remove.bind(this);
	}
	componentDidMount() {
		
	}
	render() {
		return <React.Fragment>
			<div className="main">
				<Upload add={this.state.gallery.add} />
				<Gallery list={this.state.gallery.list} remove={this.state.gallery.remove} />
			</div>
		</React.Fragment>;
	}
}

export default Main;