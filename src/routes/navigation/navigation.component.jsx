import { useState } from "react";
import { Outlet } from "react-router-dom";

import PersonInfoNav from '../../components/personInfoNav/personInfoNav.component';
import NavOptions from '../../components/navOptions/navOptions.component';

import './navigation.styles.scss';

const Navigation = () => {
    const [navOptions, setNavOptions] = useState([
        {
            Id: 1,
            title: "/home",
            titleName: "推送",
        },
        {
            Id: 2,
            title: "/dateInfo",
            titleName: "日程",
        },
        {
            Id: 3,
            title: "/personInfo",
            titleName: "个人信息",
        },
        {
            Id: 4,
            title: "/authentication",
            titleName: "注册",
        },
    ]);

    return (
        <>
            <div className="navbarBox">
                <PersonInfoNav />
                <NavOptions navOptions={navOptions} />
            </div>
            <Outlet />
        </>
    )
}

export default Navigation;