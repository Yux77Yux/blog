import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import FormReuse from '../../components/formReuse/formReuse.component';

import { signOutStart } from '../../store/user/user.actions';
import { getHintSelector, getUserSelector } from '../../store/user/user.seletor';
import './authentication.styles.scss';

export interface actionType {
    request: Request,
}

const Authertication = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sign } = useParams();
    const [value, setValue] = useState("");
    const hint = useSelector(getHintSelector);
    const userActive = useSelector(getUserSelector);
    const isActice = userActive === null;

    useEffect(() => {
        const underline = document.querySelector('.underline') as HTMLElement;
        if (sign === "sign-in") {
            setValue(() => "登录");
            underline.style.transform = "translateX(0vw)";
        }
        if (sign === "sign-up") {
            setValue(() => "注册");
            underline.style.transform = "translateX(15vw)";
        }
        if (sign === "sign-out") {
            dispatch(signOutStart());
            navigate("/authentication/sign-in");
        }

        const hintElement = document.querySelector('.hint') as HTMLElement;
        if (hintElement) {
            hintElement.style.display = 'none';
        }
    }, [sign]);

    return <div className="signBox">
        <div className="options">
            <Link to="/authentication/sign-in" className="option">
                <span className="text">
                    登录
                </span>
            </Link>
            <Link to="/authentication/sign-up" className="option">
                <span className="text">
                    注册
                </span>
            </Link>
            <div className="underline"></div>
        </div>
        {
            isActice ? <div className="sign">
                <FormReuse action={sign} value={value} />
            </div>
                : <Link to="/authentication/sign-out" className="out">退出</Link>
        }
        <div className="hint">{hint}</div>
    </div>
}

export default Authertication;