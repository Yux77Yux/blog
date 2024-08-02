import { Form } from 'react-router-dom';

import './modifyName.styles.scss';

const ModifyName = () => {
    return <>
        <div className="nameModifyBox">
            <Form method='put'>
                <span className="modifyItem"></span>
                <input type="text" name="name" placeholder={`请输入新的名称`} />
                <input type="submit" value="确认" />
            </Form>
        </div>
    </>
}

export default ModifyName;