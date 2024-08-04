import { Form } from 'react-router-dom';

import { withProcess, ModifyBioProps } from './modifyBio.process';
import './modifyBio.styles.scss';

const ModifyBio = (props: ModifyBioProps) => {
    const { activeUser, closeHandler, textChangeHandler, onSubmitHandler } = props;

    return <div className="modifyBox">
        <div className="bioModifyBox">
            <div className="titleBox">
                <span className="text">设置签名</span>
                <span className="crossMark" onClick={closeHandler}></span>
            </div>
            <Form method='put' className="contentBox" onSubmit={onSubmitHandler}>
                <div className="textBox">
                    <textarea
                        name="bio"
                        placeholder={`${activeUser && activeUser.bio !== "" ? activeUser.bio : "请输入新的签名"}`}
                        className="text"
                        onChange={textChangeHandler}
                    />
                </div>
                <div className="buttonBox">
                    <input type="reset" value="取消" className="buttonBox-item" />
                    <input type="submit" value="确认" className="buttonBox-item" />
                </div>
            </Form>
        </div>
    </div>
}

export default withProcess(ModifyBio);