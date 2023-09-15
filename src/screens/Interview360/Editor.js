import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'

const Editor = ({ editor }) => {
    return (
        <>

            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </>
    )
}

export default Editor