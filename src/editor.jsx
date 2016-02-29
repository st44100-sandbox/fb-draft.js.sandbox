console.log('Facebook Draft.js')

import React from 'react';
import ReactDOM from 'react-dom';
import {
	Editor, 
	EditorState, 
	RichUtils,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Entity,
	//getDefaultKeyBinding,
	//KeyBindingUtil
} from 'draft-js';

import DummyContent from './dummyContent'

let a = DummyContent

// MISSING keybinding on v0.1.0
// const {hasCommandModifier} = KeyBindingUtil;
// function customKeyBind (e) {
// 	if (e.keyCode === 83 && hasCommandModifier(e)) {
// 		return 'myeditor-save'
// 	} else {
// 		return getDefaultKeyBinding(e)
// 	}
// }

export default class MyEditor extends React.Component {

  constructor (props) {
    super(props)
		function getImageEntityStrategy (mutability) {
			return function (contentBlock, callback) {
				// getType: block type
				// getText: Text node.
				if (contentBlock.getType() === 'image') {
					return true
				} else {
					return false
				}
			}
		}

		function getEntityStrategy () {
			return function (contentBlock, callback) {
  			const text = contentBlock.getText();
  			let matchArr, start;
				let count = 0
				contentBlock.findEntityRanges(
					(character) => {
						const entityKey = character.getEntity();
						console.log(character, entityKey)
						if (entityKey === null) {
							return false;
						} else {
							return true;
						}
						//return Entity.get(entityKey).getMutability() === mutability;
					},
					callback
				);
			}
		}

		const TokenSpan = (props) => {
			const style = {
				color: 'red'
			} 
			return (
				<span {...props} style={style}>
					[Entity]
					{props.children}
					[/Entity]
				</span>
			)
		}

		const decorator = new CompositeDecorator([
			{
				strategy: getEntityStrategy(),
				component: TokenSpan
			}
		])

		// Start with Empty.
  	//this.state = {editorState: EditorState.createEmpty()};
		
		// Start with Content.
		const blocks = convertFromRaw(DummyContent)
		this.state = {
			editorState: EditorState.createWithContent(
				ContentState.createFromBlockArray(blocks),
				decorator
			)
		}

  	// ContentEditableが更新されることに、新しいState(EditorState)を生成する。
  	this.onChange = (editorState) => {
    	this.setState({editorState});
  	};
	}

	handleKeyCommand (cmd) {
  	const {editorState} = this.state
  	const newState = RichUtils.handleKeyCommand(editorState, cmd)
		
		// if (cmd === 'myeditor-save') {
		// 	debugger
    // }

  	if (newState) {
    	this.onChange(newState)
    	return true
    } else {
      return false
    }
  }

  _onClickBold () {
    const {editorState} = this.state
    this.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  render () {
    const {editorState} = this.state;
    return (
      <div>
        <button onClick={this._onClickBold.bind(this)} >Bold</button>
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          onChange={this.onChange}
        />
      </div>
      )
    }
  }

