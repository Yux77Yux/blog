import { NavLink } from 'react-router-dom';

import './navOption.styles.scss';

const NavOption = props => {
    const { navOption } = props;

    return (
        <NavLink to={navOption.title} key={navOption.Id} className={({ isActive }) =>
            isActive ? "navOption navActive" : "navOption"
        }>
            <span className="text">{navOption.titleName}</span>
        </NavLink>
    );
}

export default NavOption;