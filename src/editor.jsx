console.log('Facebook Draft.js')

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class MyEditor extends React.Component {

  constructor (props) {
    super(props)
  this.state = {editorState: EditorState.createEmpty()};

  // ContentEditableが更新されることに、新しいState(EditorState)を生成する。
  this.onChange = (editorState) => {
    this.setState({editorState});
  };
}

handleKeyCommand (cmd) {
  const {editorState} = this.state
  const newState = RichUtils.handleKeyCommand(editorState, cmd)

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

