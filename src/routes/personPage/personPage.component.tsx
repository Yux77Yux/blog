import { useCallback } from 'react';
import { Outlet, useLoaderData, LoaderFunctionArgs, useNavigate, Link, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserSelector } from '../../store/user/user.seletor';
import { UserIncidental } from '../../store/user/user.types';

import { fetchUserAsync } from '../../utils/processData/user.utils';
import { hintMerge } from '../../utils/hint';
import './personPage.styles.scss';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<UserIncidental | Response> => {
    try {
        const uid = params.uid;
        if (!uid || uid === "-1") {
            return redirect("/");
        }

        const currentUser = await fetchUserAsync(uid);
        if (!currentUser) {
            throw new Error('Failed to fetch user data.');
        }
        return currentUser;
    } catch (error) {
        hintMerge("Error!");
        console.log(error as Error);
        return redirect("/");
    }
};

const PersonInfo = () => {
    const data = useLoaderData(); // 默认返回类型为 unknown
    const navigate = useNavigate();
    const activeUser = useSelector(getUserSelector);
    const currentUser = data as UserIncidental;
    const isActiveUser = currentUser?.id === activeUser?.id || false;
    const profile = currentUser?.profile || require('../../assets/mingchao2.svg').default;

    const hiddleHandler = useCallback(() => {
        const pageFloat = document.querySelector('.pageFloat') as HTMLDivElement;
        const openCard = document.querySelector('.openCard') as HTMLInputElement;
        if (!pageFloat) return;
        if (!openCard) return;
        const isHiddle = pageFloat.style.transform !== 'translateX(-34vw)' ? true : false;
        pageFloat.style.transform = isHiddle ? 'translateX(-34vw)' : 'translateX(0vw)';
        openCard.style.left = isHiddle ? '0vw' : '-10vw';
    }, []);

    const copyHandler = useCallback(() => {
        const uid = document.querySelector('.right') as HTMLSpanElement;
        if (!uid) return;
        navigator.clipboard.writeText(uid.innerText);

        hintMerge("复制成功！");
    }, []);

    const clickBioHandler = useCallback(() => {
        if (!activeUser || activeUser?.id !== currentUser.id) {
            return;
        } else {
            navigate("modifyBio");
        }
    }, [activeUser, currentUser.id, navigate]);

    if (data instanceof Error) {
        return <div>Error: {data.message}</div>;
    }

    return <>
        <div className="personPage"></div>
        <input type="button" value="" className="openCard" onClick={hiddleHandler} />
        <div className="pageFloat">
            <input type="button" value="" className="crossMark" onClick={hiddleHandler} />

            <span className="topline"></span>

            <div className="profileDecorate"></div>
            <div className="profileDecorateFirst"></div>
            <div className="profileDecorateSecond"></div>
            <div className="profileDecorateThird"></div>
            <img src={profile} alt='oWo 出错！' className="profile" />
            <div className="chooseProfileShadow" style={{
                display: `${isActiveUser ? "block" : "none"}`
            }}></div>
            <Link to="modifyProfile" className="chooseProfile" style={{
                display: `${isActiveUser ? "block" : "none"}`
            }}></Link>

            <div className="name">
                <span className="text">{currentUser.name !== "" ? currentUser.name : "漂泊者" + currentUser.uid}</span>
                <Link to="modifyName" className="renameIcon" style={{
                    display: `${isActiveUser ? "block" : "none"}`
                }}></Link>
            </div>

            <div className="uid">
                <span className="text">
                    <span className="left">特征码：</span>
                    <span className="right">{currentUser.uid || '000000000'}</span>
                </span>
                <span className="copyIcon" onClick={copyHandler}></span>
            </div>

            <span className="underline"></span>

            <div className="bio">
                <span className="text" onClick={clickBioHandler}>
                    {currentUser.bio !== "" ? currentUser.bio : isActiveUser ? "点击以编辑签名" : ""}
                </span>
            </div>

            <input type="button" value="发起聊天" className="buildTalk" />
        </div>
        <Outlet />
    </>
}

export default PersonInfo;