
import { Form } from 'react-router-dom';

import Tiptap from './tiptap/tiptap.component';
import './creations.styles.scss';

const Creations = () => {

    return <Form>
        <div className="creations-page">
            <input type="text" name="title" placeholder="请输入标题" className="creation-title" />

            <Tiptap />

            <div className="save-submit">
                <input type="button" value="保存" className="button" />
                <input type="submit" value="提交" className="button" />
            </div>
        </div>
    </Form>
}

export default Creations;