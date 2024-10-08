import { Outlet } from 'react-router-dom';

import NavOptions from '../../components/navOptions/navOptions.component';

import './navigation.styles.scss';

export interface NavOptionType {
    Id: number,
    title: string,
    titleName: string,
}

const Navigation = () => {
    const navOptions: NavOptionType[] = [
        {
            Id: 1,
            title: "/",
            titleName: "主页",
        },
        {
            Id: 2,
            title: "/search",
            titleName: "搜索",
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