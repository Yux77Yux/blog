import { useCallback, useRef } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'

import iconUrl from '../../../assets/memes/icons/link-round-1110-svgrepo-com.svg';

import './editor.styles.scss';
import './tiptap.styles.scss';

export const MenuBar = ({ editor }) => {
    const ref = useRef({
        headList: null,
        colorPicker: null,
        textColorPicker: null,
    });

    const toggleHeadingList = useCallback((event) => {
        const head = event.currentTarget.getBoundingClientRect();
        const parentRect = event.currentTarget.parentElement.getBoundingClientRect(); // 获取父元素的位
        if (ref.current.headList) {
            ref.current.headList.style.left = `${head.left - parentRect.left}px`; // 设置下拉菜单的位置
        }
    }, [ref]);

    const toggleTextColor = useCallback((event) => {
        const pickColor = event.currentTarget.getBoundingClientRect();
        const parentRect = event.currentTarget.parentElement.getBoundingClientRect(); // 获取父元素的位
        if (ref.current.textColorPicker) {
            ref.current.textColorPicker.style.left = `${pickColor.left - parentRect.left}px`; // 设置下拉菜单的位置
        }
    }, [ref]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain()
                .focus()
                .extendMarkRange('link')
                .unsetLink()
                .run();
            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').toggleLink({ href: url })
            .run()
    }, [editor]);

    if (!editor) {
        return null
    }

    return (
        <div className="creation-control-group">
            <div className="button-group">
                <button
                    className='showColorPicker'
                    onClick={toggleTextColor}
                >
                    <u>A</u>
                </button>
                <div
                    ref={el => ref.current.textColorPicker = el}
                    className='colorPickers'>
                    <input
                        type="color"
                        onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                        value={editor.getAttributes('textStyle').color}
                        data-testid="setColor"
                    />

                    <button
                        className='text-color-default'
                        onClick={() => editor.chain().focus().unsetColor().run()}
                        data-testid="unsetColor"
                    >
                        默认
                    </button>
                </div>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <strong>B</strong>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <i>I</i>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <s>S</s>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    <u>U</u>
                </button>
                <button
                    onClick={toggleHeadingList}
                    className={editor.isActive('heading') ? 'is-active show-h-list' : 'show-h-list'}
                >
                    H
                </button>
                <ul ref={el => (ref.current.headList = el)}
                    className="h-list">
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                        >
                            H1
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        >
                            H2
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                        >
                            H3
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                        >
                            H4
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                        >
                            H5
                        </button>
                    </li>
                </ul>

                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'is-active' : ''}
                >
                    Highlight
                </button>
                <input type="color"
                    name="colorPicker"
                    value="#ff0000"
                ></input>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: 'red' }).run()}
                    className={editor.isActive('highlight', { color: 'red' }) ? 'is-active' : ''}
                >
                    Red
                </button>
                <button onClick={setLink} className={editor.isActive('link') ? 'is-active ' : ''}>
                    Link
                </button>

            </div>
        </div >
    )
}

const Tiptap = () => {
    const extensions = [
        Document,
        Paragraph,
        Text,
        TextStyle,
        Color,
        Bold,
        Italic,
        Strike,
        Underline,
        Heading.configure({
            levels: [1, 2, 3, 4, 5],
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
