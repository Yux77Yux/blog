import { Link } from 'react-router-dom';

import './personProfileNav.styles.scss'

const PersonProfileNav = () => {
    const MingChaoLogo = require("../../assets/mingchao3.svg").ReactComponent;
    const dropOptions = [
        {
            Id: 1,
            title: "主页",
            toURL: "/",
        },
        {
            Id: 2,
            title: "个人中心",
            toURL: "/",
        },
        {
            Id: 3,
            title: "退出",
            toURL: "/",
        },
    ];

    return (
        <div className="personProfileNavBox">
            <div className="personInfoNav">
                <MingChaoLogo className="iconPortrait" />
                <span className="username">宇Yux</span>
                <span className="lightLine"></span>
                <span className="SignInState">在线</span>
            </div>

            <div className="dropPersonOptions">
                <div className="dropOptions">
                    {
                        dropOptions.map(option =>
                            <Link to="" className="dropOption" key={option.Id}>
                                <span className="text">{option.title}</span>
                            </Link>
                        )
                    }
                    <div className="dropOption">
                        <span className="text">登录</span>
                    </div>
                    <div className="dropOption">
                        <span className="text">注册</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PersonProfileNav;