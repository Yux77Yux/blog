import { Outlet } from "react-router-dom";

import NavOptions from '../../components/navOptions/navOptions.component';

import './navigation.styles.scss';

const Navigation = () => {
    const navOptions = [
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
    ];

    return (
        <>
            <div className="navbarBox">
                <NavOptions navOptions={navOptions} />
            </div>
            <div className="background">
                <Outlet />
            </div>
        </>
    )
}

export default Navigation;