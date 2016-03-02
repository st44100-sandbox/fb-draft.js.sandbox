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
  Modifier,
  // MISSING keybinding on v0.1.0
	//getDefaultKeyBinding,
	//KeyBindingUtil
} from 'draft-js';

import DummyContent from './dummyContent'

// Custom Style Mapping.
import customStyleMap from './customStyleMap'

let a = DummyContent


// #94c6824 currently there is a bug to cut/copy/paset image block.
class ImageBlock extends React.Component {
  render() {
    const {block, foo} = this.props;
		let url = block.getText()
    //const data = Entity.get(block.getEntityAt(0)).getData();
		return (
			<img src={url}/>
		)
  }
}



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

    // Create decorator.
		const decorator = new CompositeDecorator([
			{
				strategy: this._getEntityStrategy(),
				component: this._spanComp
			},
			// {
			// 	strategy: this._getImageEntityStrategy(),
			// 	component: this._spanComp
			// }
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

  /**
   * Decorator Storategy for Image.
   */
  _getImageEntityStrategy () {
    return function (contentBlock, callback) {
      if (contentBlock.getType() === 'image') {
        return true
      } else {
        return false
      }
    }
  }


  /**
   * Decorator Storategy for Entity.
   */
  _getEntityStrategy () {
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

  _spanComp (props) {
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

  _onClickStrike () {
    const {editorState}  = this.state
    const selection = editorState.getSelection()

    const nextEditorState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH')
    this.onChange(nextEditorState);
  }
	
  customBlockRenderer (contentBlock) {
		const type = contentBlock.getType()
		if (type === 'image') {
			return {
				component: ImageBlock,
				props: {
					url: 'URL'
				}
			}
		}
	}

  render () {
		function blockStyleFn(contentBlock) {
			if (contentBlock.getType() === 'image') {
				return 'block-image'
			}
    }

    const {editorState} = this.state;
    return (
      <div>
        <button onClick={this._onClickBold.bind(this)} >Bold</button>
        <button onClick={this._onClickStrike.bind(this)} >Strike</button>
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
					blockStyleFn={blockStyleFn}
					blockRendererFn={this._customBlockRenderer}
          onChange={this.onChange}
          customStyleMap={customStyleMap}
        />
      </div>
      )
    }
  }

