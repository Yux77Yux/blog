import { useState } from "react";
import { Outlet } from "react-router-dom";

import PersonProfileNav from '../../components/personProfileNav/personProfileNav.component';
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
            title: "/dateArrange",
            titleName: "日程",
        },
        {
            Id: 3,
            title: "/favorites",
            titleName: "收藏",
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
                <PersonProfileNav />
                <NavOptions navOptions={navOptions} />
            </div>
            <div className="bgground">
                <Outlet />
            </div>
        </>
    )
}

export default Navigation;