import React from 'react';
import Gallery from '../gallery';
import Upload from '../upload';
import './style.scss';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drop: false,
			gallery: {
				list: {
					head: null,
					tail: null,
				},
				add(url) {
					const newNode = {
						id: this.state.gallery.list.head ? this.state.gallery.list.head.id + 1 : 0,
						url: url,
						next: this.state.gallery.list.head
					};

					this.setState(prevState => ({
						gallery: {
							...prevState.gallery,
							list: {
								...prevState.gallery.list,
								head: newNode,
							},
						}
					}));

					if (!this.state.gallery.list.tail) {
						this.setState(prevState => ({
							gallery: {
								...prevState.gallery,
								list: {
									...prevState.gallery.list,
									tail: newNode,
								}
							}
						}));
					}
				},
				delete(id) {
					if (!this.state.gallery.list.head) {
						return null;
					}

					let deletedNode = null;

					// Если head должен быть удален, то делаем следующий узел новым head.
					if (this.state.gallery.list.head && this.state.gallery.list.head.id === id) {
						deletedNode = this.state.gallery.list.head;

						// Переназначаем следующий за head узел на новый head.
						this.setState(prevState => ({
							gallery: {
								...prevState.gallery,
								list: {
									...prevState.gallery.list,
									head: deletedNode.next,
								},
							}
						}));
					}

					let currentNode = this.state.gallery.list.head;

					// Если следующий узел должен быть удален,
					// делаем узел через один, следующим для проверки.
					// Перебираем все узлы и удаляем их, если их значение равно указанному.
					if (currentNode !== null) {
						while (currentNode.next) {
							if (currentNode.next.id === id) {
								deletedNode = currentNode.next;
								// Перезаписываем, чтобы узел через один стал следующим узлом.
								currentNode.next = currentNode.next.next;
								this.forceUpdate();
							} else {
								currentNode = currentNode.next;
							}
						}
					}

					// Проверяем, должен ли tail быть удален.
					// Так как, если в цикле мы удаляем последний узел,
					// то с предпоследнего узла убираем только ссылку на него.
					// Поэтому делаем проверку на его удаление с "tail".
					if (this.state.gallery.list.tail && this.state.gallery.list.tail.id === id) {
						// в данном случае currentNode это или предпоследний узел или head.
						this.setState(prevState => ({
							gallery: {
								...prevState.gallery,
								list: {
									...prevState.gallery.list,
									tail: currentNode,
								},
							}
						}));
					}
				},
				toArray() {
					const nodes = [];

					let currentNode = this.state.gallery.list.head;

					while (currentNode) {
						nodes.push(currentNode);
						currentNode = currentNode.next;
					}

					return nodes;
				}
			}
		}
		this.state.gallery.add = this.state.gallery.add.bind(this);
		this.state.gallery.delete = this.state.gallery.delete.bind(this);
		this.state.gallery.toArray = this.state.gallery.toArray.bind(this);
		this.handleDragenter = this.handleDragenter.bind(this);
		this.handleDragover = this.handleDragover.bind(this);
		this.handleDragleave = this.handleDragleave.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}
	componentDidMount() {
		document.querySelector('.main').addEventListener('drop', this.handleDrop, false)
		document.querySelector('.main').addEventListener('dragover', this.handleDragover, false)
		document.querySelector('.main').addEventListener('dragenter', this.handleDragenter, false)
		document.querySelector('.main').addEventListener('dragleave', this.handleDragleave, false)
	}
	extensions = ['png', 'jpg', 'jpeg', 'gif']
	handleDragover(e) {
		e.preventDefault()
		e.stopPropagation()
		this.setState(prevState => ({
			drop: true,
		}));
	}
	handleDragenter(e) {
		e.preventDefault()
		e.stopPropagation()
		this.setState(prevState => ({
			drop: true,
		}));
	}
	handleDragleave(e) {
		e.preventDefault()
		e.stopPropagation()
		this.setState(prevState => ({
			drop: false,
		}));
	}
	handleDrop(e) {
		e.preventDefault()
		e.stopPropagation()

		let dt = e.dataTransfer
		let files = dt.files

		Array.from(files).forEach(file => {
			if (this.extensions.includes(this.getExtension(file.name))) {
				this.state.gallery.add(URL.createObjectURL(file));
			}
		});
		this.setState(prevState => ({
			drop: false,
		}));
	}
	getExtension(string) {
		const arr = string.split('.');

		return (arr[arr.length - 1]).toLowerCase();
	}
	render() {
		return <React.Fragment>
			<div className="main">
				<Upload add={this.state.gallery.add} />
				<Gallery gallery={this.state.gallery} />
				{this.state.drop ? <div className="drop"><div className="drop__text">Drop image<br/>to upload</div></div> : null}
			</div>
		</React.Fragment>;
	}
}

export default Main;