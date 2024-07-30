/* eslint-disable no-useless-escape */
import { useCallback } from 'react';
import { Form } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { UsernameAndPassword } from '../../store/user/user.types';
import { signUpWithEmailStart, signInWithEmailStart } from '../../store/user/user.actions';
import './formReuse.styles.scss';

export interface FormProps {
    action: string | undefined,
    value: string,
}

const FormReuse = (props: FormProps) => {
    const { action, value } = props;
    const dispatch = useDispatch();

    const clearHandler = useCallback((event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const parent = target.parentNode as HTMLElement;
        if (!parent) return;

        const submit = document.querySelector('#submitSign') as HTMLInputElement;
        if (!submit) return;
        submit.style.pointerEvents = 'none';
        submit.style.opacity = '0.5';

        const tag = document.querySelector('.tag') as HTMLDivElement;
        if (!tag) return;
        tag.innerText = "密码由非数字开头,特殊字符、数字、字母任意两种组合,长度大于7";

        const inputText = parent.children[0] as HTMLInputElement;
        if (!inputText) return;
        inputText.value = "";
    }, []);

    const sumbmitHandler = useCallback((event: React.FormEvent) => {
        event.preventDefault();

        const hint = document.querySelector('.hint') as HTMLElement;
        if (!hint) return;
        hint.style.display = 'block';

        const form = event.currentTarget as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        if (username === "" || password === "") return;

        const user: UsernameAndPassword = {
            username: username,
            password: password,
        }
        if (action === "sign-in") {
            dispatch(signInWithEmailStart(user));
        }
        if (action === "sign-up") {
            dispatch(signUpWithEmailStart(user));
        }

    }, [dispatch, action]);

    const typeInHandler = useCallback((event: React.ChangeEvent) => {
        const pattern = /^[A-Za-z!@#$%^&*()_+={}\[\]:;"'<>,.?/]+([A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/]){7,}$/g;
        const target = event.target as HTMLInputElement;
        if (!target) return;
        const text = target.value;

        const submit = document.querySelector('#submitSign') as HTMLInputElement;
        if (!submit) return;
        submit.style.pointerEvents = 'none';
        submit.style.opacity = '0.5';

        const tag = document.querySelector('.tag') as HTMLDivElement;
        if (!tag) return;
        tag.innerText = "密码由非数字开头,特殊字符、数字、字母任意两种组合,长度大于7";

        if (pattern.test(text)) {
            submit.style.pointerEvents = 'auto';
            submit.style.opacity = '1';

            tag.innerText = "通过√";
        }

    }, []);

    return <Form className="FormBox" onSubmit={sumbmitHandler}>
        <div className="inputBox">
            <input type="text" name="username" placeholder="用户名" />
            <div className="crossMark" onClick={clearHandler} ></div>
        </div>
        <div className="inputBox">
            <input type="password" name="password" placeholder="密码" onChange={typeInHandler} />
            <div className="crossMark" onClick={clearHandler} ></div>
        </div>
        <div className="tag">密码由非数字开头,特殊字符、数字、字母任意两种组合,长度大于7</div>
        <input type="submit" value={value} id="submitSign" />
    </Form>
}

export default FormReuse;