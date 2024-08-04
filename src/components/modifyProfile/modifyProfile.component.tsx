import { Form } from 'react-router-dom';

import { withProcess, ModifyProfileProps } from './modifyProfile.process';
import './modifyProfile.styles.scss';

const ModifyProfile = (props: ModifyProfileProps) => {
    const {
        closeHandler,
        changeHandler,
        clickHandler,
        dragOverHandler,
        dragEnterHandler,
        dragLeaveHandler,
        dropHandler,
        imgMouseDownHandler,
        imgMouseUpHandler,
        imgMouseLeaveHandler,
        imgMouseMoveHandler,
        trimHandler,
        no_trimHandler,
        fineHandler,
        onSubmitHandler,
        activeProfile,
        newProfile,
    } = props;

    return <div className="modifyBox">
        <div className="profileModifyBox">
            <div className="title">
                <span className="text">个人头像编辑</span>
            </div>
            <span className="crossMark" onClick={closeHandler}></span>
            <Form method='put' className="from-box" onSubmit={onSubmitHandler}>
                <input type="file" id="profile-file" name="profile" onChange={changeHandler} />
                <div className="uploadFileBox">
                    <div className="uploadFile"
                        onClick={clickHandler}
                        onDragOver={dragOverHandler}
                        onDragEnter={dragEnterHandler}
                        onDragLeave={dragLeaveHandler}
                        onDrop={dropHandler}
                    >
                        <div className="progress-container">
                            <div className="progress-bar">0%</div>
                        </div>
                    </div>

                    <div className="profile-preview">
                        <img
                            alt=""
                            className="profile-preview-img"
                            onMouseDown={imgMouseDownHandler}
                            onMouseUp={imgMouseUpHandler}
                            onMouseMove={imgMouseMoveHandler}
                            onMouseLeave={imgMouseLeaveHandler}
                        />
                    </div>
                    <img src={newProfile} alt="" id='resultImg' />
                    <canvas id="canvas" style={{ display: "none" }} />

                    <div className="circleBox">
                        <div className="circleTopLeft"></div>
                        <div className="circleTopRight"></div>
                        <div className="circleBottomRight"></div>
                        <div className="circleBottomleft"></div>
                    </div>


                    <input type="button" value="裁切" className="trim" onClick={trimHandler} />
                    <input type="button" value="不裁切" className="no-trim" onClick={no_trimHandler} />
                    <input type="button" value="确认" className="fine" onClick={fineHandler} />
                </div>

                <input type="submit" value="上传" className="submit" />
            </Form>
            <div className="activeBox">
                <img src={activeProfile} alt="owo! error" className="active-profile-radius" />
                <img src={activeProfile} alt="owo! error" className="active-profile" />
                <img src={newProfile} alt="owo! error" className="new-profile-radius" />
                <img src={newProfile} alt="owo! error" className="new-profile" />
            </div>
        </div>
    </div>
}

export default withProcess(ModifyProfile);