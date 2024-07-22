import { NavLink } from 'react-router-dom';
import { NavOptionType } from '../../routes/navigation/navigation.component';

import './navOption.styles.scss';

export interface NavOptionProps {
    navOption: NavOptionType,
}

const NavOption = (props: NavOptionProps) => {
    const { navOption } = props;

    return (
        <NavLink to={navOption.title} key={navOption.Id} className={({ isActive }) =>
            isActive ? "navOption navActive" : "navOption"
        }>
            <div className="activePart"></div>
            <span className="text">{navOption.titleName}</span>
        </NavLink>
    );
}

export default NavOption;