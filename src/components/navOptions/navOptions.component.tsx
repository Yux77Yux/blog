import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import NavOption from '../navOption/navOption.component'
import { NavOptionType } from '../../routes/navigation/navigation.component';

import './navOptions.styles.scss';

export interface NavOptionsProps {
    navOptions: NavOptionType[],
}

const NavOptions = (props: NavOptionsProps) => {
    const { navOptions } = props;
    const navigate = useNavigate();
    const backHandler = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="navOptions">
            {
                navOptions.map(option => (
                    <NavOption navOption={option} key={option.Id} />
                ))
            }
            <div className="navOption" >
                <div className="activePart"></div>
                <span className="text" onClick={backHandler}>返回</span>
            </div>
        </div>
    );
}

export default NavOptions;