import { Form } from 'react-router-dom';
import './modifyBio.styles.scss';

const ModifyBio = () => {
    return <>
        <div className="bioModifyBox">
            <Form method='put'>
                <span className="modifyItem"></span>
                <input type="text" name="bio" placeholder={`请输入新的签名`} />
                <input type="submit" value="确认" />
            </Form>
        </div>
    </>
}

export default ModifyBio;