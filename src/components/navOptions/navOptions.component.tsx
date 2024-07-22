import NavOption from '../navOption/navOption.component'

import { NavOptionType } from '../../routes/navigation/navigation.component';

import './navOptions.styles.scss';

export interface NavOptionsProps {
    navOptions: NavOptionType[],
}

const NavOptions = (props: NavOptionsProps) => {
    const { navOptions } = props;

    return (
        <div className="navOptions">
            {
                navOptions.map(option => (
                    <NavOption navOption={option} key={option.Id} />
                ))
            }
        </div>
    );
}

export default NavOptions;