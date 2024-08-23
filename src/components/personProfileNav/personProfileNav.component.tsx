import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserSelector } from '../../store/user/user.seletor';

import './personProfileNav.styles.scss'

const PersonProfileNav = () => {
    const currentUser = useSelector(getUserSelector);
    const [profilePath, setProfilePath] = useState<string>(require("../../assets/mingchao2.svg").default);

    const dropOptions = [
        {
            Id: 1,
            title: "主页",
            toURL: "/",
        },
        {
            Id: 2,
            title: "个人中心",
            toURL: `/personPage/${currentUser?.uid || -1}`,
        },
    ];

    useEffect(() => {
        if (!currentUser) {
            setProfilePath(() => require("../../assets/mingchao3.svg").default);
            return;
        };
        setProfilePath(() => currentUser.profile);
    }, [currentUser]);

    return (
        <div className="personProfileNavBox">
            <div className="personInfoNav">
                <img src={profilePath} alt="qwq erroe!" className="iconPortrait" />
                <span className="username">{currentUser?.name || "漂泊者"}</span>
                <span className="lightLine"></span>
                <span className="SignInState">{currentUser?.status === true ? "在线" : "离线"}</span>
            </div>

            <div className="dropPersonOptions">
                <div className="dropOptions">
                    {
                        dropOptions.map(option =>
                            <Link to={option.toURL} className="dropOption" key={option.Id}>
                                <span className="text">{option.title}</span>
                            </Link>
                        )
                    }
                    {
                        currentUser ? <>
                            <Link to="/creations" className="dropOption">
                                <span className="text">发布</span>
                            </Link>
                            <Link to="/authentication/sign-out" className="dropOption">
                                <span className="text">退出</span>
                            </Link>
                        </>
                            : <>
                                <Link to="/authentication/sign-in" className="dropOption">
                                    <span className="text">登录</span>
                                </Link>
                                <Link to="/authentication/sign-up" className="dropOption">
                                    <span className="text">注册</span>
                                </Link>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
export default PersonProfileNav;