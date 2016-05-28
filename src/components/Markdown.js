'use strict'

import React from 'react'
import ReactCSS from 'reactcss'
import markdown from '../helpers/markdown'

import Code from './Code'

module.exports = class Markdown extends ReactCSS.Component {

  classes() {
    return {
      'default': {
        markdown: {
          fontSize: '17px',
          lineHeight: '24px',
          color: 'rgba(0,0,0,.47)',
        },
      },
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const children = this.props.children

    let newLines = children

    const codes = []
    for (let i = 0; i < markdown.isCode(children).length; i++) {
      const codeBlock = markdown.isCode(children)[i]
      newLines = newLines.replace(codeBlock[1], `|Code:${ i }|`)
      codes[i] = <Code file={ codeBlock[2] } condensed={ this.props.condensed } borders />
    }

    const markdownFile = []
    for (let i = 0; i < newLines.split('\n').length; i++) {
      const line = newLines.split('\n')[i]
      if (markdown.isCodeBlock(line)) {
        markdownFile.push(<div key={ i }>{ codes[markdown.codeNumber(line)] }</div>)
      } else {
        markdownFile.push((
          <div
            key={ i }
            is="markdown"
            className="markdown text"
            dangerouslySetInnerHTML={ { __html: markdown.render(line) } }
          />
        ))
      }
    }

    return (
      <div is="markdown">
        { markdownFile }
      </div>
    )
  }
}
