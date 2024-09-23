
import { useEditor, EditorContent } from '@tiptap/react'
import MenuBar from './tiptap.menu.config'
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import History from '@tiptap/extension-history'
import Paragraph from '@tiptap/extension-paragraph'
import FontFamily from '@tiptap/extension-font-family'
import Table from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from './lowlight.config'

import './editor.styles.scss';
import './tiptap.styles.scss';
import 'highlight.js/styles/atom-one-dark.css'

const Tiptap = () => {
    const extensions = [
        Document,
        Paragraph,
        FontFamily,
        Text,
        TextStyle,
        Color,
        Bold,
        Italic,
        Strike,
        Underline,
        Subscript,
        Superscript,
        Gapcursor,
        TableRow,
        TableHeader,
        TableCell,
        Table.configure({
            resizable: true,
        }),
        Placeholder.configure({
            placeholder: ({ node }) => {
                if (node.type.name === 'heading') {
                    return '标题'
                }

                return '写什么？'
            },
        }),
        Heading.configure({
            levels: [1, 2, 3, 4, 5],
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Highlight.configure({
            multicolor: true
        }),
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
            validate: (href) => /^https?:\/\//.test(href),
        }),
        History.configure({
            depth: 30,
            newGroupDelay: 600,
        }),
        CodeBlockLowlight.configure({
            lowlight,
        }),
    ];

    const content = '<p></p>';

    const editorProps = {
        attributes: {
            id: 'editor_creation',
            spellcheck: 'false',
        }
    }

    const editor = useEditor({
        extensions,
        content,
        editorProps,
    });

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="creation-content" />
        </>
    )
}

export default Tiptap
