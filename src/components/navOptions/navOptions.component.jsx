import NavOption from '../navOption/navOption.component'

import './navOptions.styles.scss';

const NavOptions = props => {
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