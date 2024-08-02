import { Form } from 'react-router-dom';
import './modifyProfile.styles.scss';

const ModifyProfile = () => {
    return <>
        <div className="profileModifyBox">
            <Form method='put'>
                <span className="modifyItem"></span>
                <input type="submit" value="确认" />
            </Form>
        </div>
    </>
}

export default ModifyProfile;