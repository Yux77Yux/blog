import { useState } from 'react';

import { ReactComponent as MingChaoLogo } from '../../assets/mingchao3.svg';
import './personProfileNav.styles.scss'
import { Link } from 'react-router-dom';

const PersonProfileNav = () => {
    const [dropOptions, setDropOptions] = useState([
        {
            Id: 1,
            title: "个人中心",
            toURL: "/",
        },
    ])

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
                            <Link className="dropOption" key={option.Id}>
                                <span className="text">{option.title}</span>
                            </Link>
                        )
                    }
                    <div className="dropOption">
                        <span className="text">退出</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PersonProfileNav;