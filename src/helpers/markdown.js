'use strict'

import Remarkable from 'remarkable'
import hljs from 'highlight.js'
const regularMd = new Remarkable()
const codeMd = new Remarkable({
  highlight: (str) => {
    try {
      return hljs.highlight('javascript', str).value
    } catch (err) {
      console.log(err)
    }
    return false
  },
})

export default {

  render: (text) => {
    return regularMd.render(text)
  },

  renderCode: (text) => {
    return codeMd.render(text)
  },

  getArgs: (code) => {
    const args = {}
    if (code.indexOf('---') > -1) {
      const match = /---([\s\S]*?)---\n([\s\S]*)/.exec(code)
      const argSplit = match[1].trim().split('\n')

      for (let i = 0; i < argSplit.length; i++) {
        const arg = argSplit[i]
        const regex = /(.+?): (.+)/.exec(arg)
        args[regex[1]] = regex[2]
      }

      code = match[2]
    }

    return args
  },

  getBody: (code) => {
    if (code.indexOf('---') > -1) {
      const match = /---([\s\S]*?)---\n([\s\S]*)/.exec(code)
      return match[2]
    }
    return code
  },

  isCode: (text) => {
    const array = []
    const reg = new RegExp(/(```.*\n([\s\S]*?)```)/g)
    let match
    while ((match = reg.exec(text)) !== null) {
      array.push(match)
    }

    return array
  },

  isCodeBlock: (string) => {
    if (string.indexOf('|Code:') > -1) {
      return true
    }
    return false
  },

  isSubSection: (string) => {
    if (string.split('-')[0].indexOf('.') === -1) {
      return true
    }
    return false
  },

  codeNumber: (string) => {
    return /\|Code:(.+?)\|/.exec(string)[1]
  },

}
