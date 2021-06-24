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
				list: {},
				add() {
					this.setState(prevState => ({
						gallery: {
							...prevState.gallery,
							list: {
								...prevState.gallery.list,
							}
						}
					}));
				},
				remove() {
					this.setState(prevState => ({
						gallery: {
							...prevState.gallery,
							list: {
								...prevState.gallery.list,
							}
						}
					}));
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
			<div className="container">
				<Upload add={this.state.gallery.add} />
				<Gallery remove={this.state.gallery.remove} />
			</div>
		</React.Fragment>;
	}
}

export default Main;