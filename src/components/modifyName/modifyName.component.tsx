import { Form } from 'react-router-dom';

import { withProcess, ModifyNameProps } from './modifyName.process';
import './modifyName.styles.scss';

const ModifyName = (props: ModifyNameProps) => {
    const { activeUser, closeHandler, textChangeHandler, onSubmitHandler } = props;

    return <div className="modifyBox">
        <div className="nameModifyBox">
            <div className="titleBox">
                <span className="text">设置漂泊者昵称</span>
                <span className="crossMark" onClick={closeHandler}></span>
            </div>
            <Form method='put' className="contentBox" onSubmit={onSubmitHandler}>
                <div className="textBox">
                    <input
                        type="text"
                        name="name"
                        placeholder={`${activeUser && activeUser.name}`}
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

export default withProcess(ModifyName);