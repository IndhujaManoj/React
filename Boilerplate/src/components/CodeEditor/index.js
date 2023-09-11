import { useRef } from 'react'
import Editor from '@monaco-editor/react'
import ShowSpinner from 'components/Spinner/spinner'

const CodeEditor = (props) => {
  const {
    height,
    width,
    language = 'python',
    code = `# some comment`,
    onCodeChange,
    isReadOnly = false,
  } = props

  const editorOnMount = (editor, monaco) => {
    editor.onDidFocusEditorText(() => {
      console.log('it has just got focused')
    })

    editor.onDidBlurEditorText(() => {
      console.log('it has just got unfocused')
    })
  }

  return (
    <Editor
      height={height}
      width={width}
      language={language}
      value={code}
      onChange={onCodeChange}
      options={{ fontSize: 15, cursorStyle: 'block', readOnly: isReadOnly }}
      onMount={editorOnMount}
      loading={<ShowSpinner />}
    />
  )
}

export default CodeEditor
