import { useCallback, useRef, useState } from 'react'

import link_symbol from '../../../assets/icons/link-round-1110-svgrepo-com.svg';
import highlight_symbol from '../../../assets/icons/shining.png';
import left_align from '../../../assets/icons/justify/left.svg'
import right_align from '../../../assets/icons/justify/right.svg'
import center_align from '../../../assets/icons/justify/center.svg'
import justify_align from '../../../assets/icons/justify/justify.svg'
import table_symbol from '../../../assets/icons/table_icons/table.png'
import table_add_symbol from '../../../assets/icons/add.png'
import table_subtract_symbol from '../../../assets/icons/minus.png'


const MenuBar = ({ editor }) => {

    const ref = useRef({
        headList: null,
        colorPicker: null,
        textColorPicker: null,
        tableList: null,
        table_addList: null,
        table_deleteList: null,
        table_spanList: null,
        table_toggleList: null,
    });

    const toggleHeadingList = useCallback((event) => {
        const head = event.currentTarget.getBoundingClientRect();
        const parentRect = event.currentTarget.parentElement.getBoundingClientRect(); // 获取父元素的位
        if (ref.current.headList) {
            ref.current.headList.style.left = `${head.left - parentRect.left}px`; // 设置下拉菜单的位置
        }
    }, [ref]);

    const toggleTableList = useCallback((event) => {
        const table = event.currentTarget.getBoundingClientRect();
        const parentRect = event.currentTarget.parentElement.getBoundingClientRect(); // 获取父元素的位
        if (ref.current.tableList) {
            ref.current.tableList.style.left = `${table.left - parentRect.left}px`; // 设置下拉菜单的位置
        }
    }, [ref]);

    const toggleTextColor = useCallback((event) => {
        const pickColor = event.currentTarget.getBoundingClientRect();
        const parentRect = event.currentTarget.parentElement.getBoundingClientRect(); // 获取父元素的位
        if (ref.current.textColorPicker) {
            ref.current.textColorPicker.style.left = `${pickColor.left - parentRect.left}px`; // 设置下拉菜单的位置
        }
    }, [ref]);

    const toggleHighlights = useCallback((event) => {
        const pickColor = event.currentTarget.getBoundingClientRect();
        const parentRect = event.currentTarget.parentElement.getBoundingClientRect(); // 获取父元素的位
        if (ref.current.colorPicker) {
            ref.current.colorPicker.style.left = `${pickColor.left - parentRect.left}px`; // 设置下拉菜单的位置
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
                    className='show-text-color-picker'
                    onMouseOver={toggleTextColor}
                >
                    <u>A</u>
                </button>
                <div
                    ref={el => ref.current.textColorPicker = el}
                    className='text-color-pickers'>
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
                    B
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
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    className={editor.isActive('subscript') ? 'is-active' : ''}
                >
                    sub
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    className={editor.isActive('superscript') ? 'is-active' : ''}
                >
                    sup
                </button>

                <button
                    onMouseMove={toggleHeadingList}
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
                            H<sub>1</sub>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        >
                            H<sub>2</sub>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                        >
                            H<sub>3</sub>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                        >
                            H<sub>4</sub>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                        >
                            H<sub>5</sub>
                        </button>
                    </li>
                </ul>

                <button
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                    onMouseMove={toggleHighlights}
                    className={editor.isActive('highlight') ? 'is-active show-highlight-List' : 'show-highlight-List'}
                    style={{
                        backgroundImage: `url(${highlight_symbol})`,
                    }}
                >
                </button>
                <ul
                    ref={el => ref.current.colorPicker = el}
                    className="highlight-color-list"
                >
                    <li>
                        <input type="color"
                            onInput={event => editor.chain().focus().toggleHighlight({ color: event.target.value }).run()}
                            value={editor.getAttributes('highlight').color || '#ffff00'}
                            data-testid="setHighlightColor"
                        >
                        </input>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffff00' }).run()}
                            className={editor.isActive('highlight', { color: '#ffff00' }) ? 'is-active' : ''}
                            style={{
                                backgroundColor: '#ffff00'
                            }}
                        >
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
                            className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
                            style={{
                                backgroundColor: '#ffc078'
                            }}
                        >
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
                            className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}
                            style={{
                                backgroundColor: '#8ce99a'
                            }}
                        >
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
                            className={editor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''}
                            style={{
                                backgroundColor: 'ffa8a8'
                            }}
                        >
                        </button>
                    </li>
                </ul>

                <button onClick={setLink}
                    className={editor.isActive('link') ? 'is-active ' : ''}
                    style={{
                        backgroundImage: `url(${link_symbol})`,
                    }}
                >
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    &lt;/&gt;
                </button>

                <button onMouseMove={toggleTableList}
                    className='show-table-list'
                    style={{
                        backgroundImage: `url(${table_symbol})`
                    }}
                ></button>
                <ul ref={(el) => ref.current.tableList = el}
                    className='table-list'
                >
                    <li className='show-table-add-list'>
                        <button style={{
                                backgroundImage: `url(${table_add_symbol})`
                            }}>
                        </button>
                        <ul className='table-add-list'>
                            <li>
                                <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                                    Insert table
                                </button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
                                    Add column before
                                </button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
                            </li>
                        </ul>
                    </li>
                    <li className='show-table-delete-list'>
                        <button style={{
                                backgroundImage: `url(${table_subtract_symbol})`
                            }}>
                        </button>
                        <ul className="table-delete-list">
                            <li>
                                <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
                            </li>
                        </ul>
                    </li>
                    <li className='show-table-span-list'>
                        <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
                            Merge or split
                        </button>
                        <ul ref={(el) => ref.current.table_spanList = el}
                            className="table-span-list">
                            <li>
                                <button onClick={() => editor.chain().focus().mergeCells().run()}>Merge</button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().splitCell().run()}>Split</button>
                            </li>
                        </ul>
                    </li>
                    <li className='show-table-toggle-list'>
                        <button>
                            Toggle
                        </button>
                        <ul ref={(el) => ref.current.table_toggleList = el}
                            className="table-toggle-list">
                            <li>
                                <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                                    header column
                                </button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                                    header row
                                </button>
                            </li>
                            <li>
                                <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                                    header cell
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                            Set cell attribute
                        </button>
                    </li>
                    <li>
                        <button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
                    </li>
                    <li>
                        <button onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</button>
                    </li>
                    <li>
                        <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                            Go to previous cell
                        </button>
                    </li>
                </ul>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                    style={{
                        backgroundImage: `url(${left_align})`
                    }}
                >
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                    style={{
                        backgroundImage: `url(${center_align})`
                    }}
                >
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                    style={{
                        backgroundImage: `url(${right_align})`
                    }}
                >
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                    style={{
                        backgroundImage: `url(${justify_align})`
                    }}
                >
                </button>
            </div>
        </div >
    )
}

export default MenuBar;