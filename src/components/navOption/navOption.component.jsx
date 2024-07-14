import { NavLink, useLocation } from 'react-router-dom';

import './navOption.styles.scss';

const NavOption = props => {
    const location = useLocation();
    const { navOption } = props;

    return (
        <NavLink to={navOption.title} key={navOption.Id} className={({ isActive }) =>
            isActive || (location.pathname === '/' && navOption.Id === 1) ? "navOption navActive" : "navOption"
        }>
            <span className="text">{navOption.titleName}</span>
        </NavLink>
    );
}

export default NavOption;