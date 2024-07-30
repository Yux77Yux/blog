import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserSelector } from '../../store/user/user.seletor';

import './personProfileNav.styles.scss'

const PersonProfileNav = () => {
    const currentUser = useSelector(getUserSelector);
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
                    {
                        currentUser ? <Link to="/authentication/sign-out" className="dropOption">
                            <span className="text">退出</span>
                        </Link>
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