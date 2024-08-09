import { useEffect, useCallback, MouseEventHandler, ComponentType, ChangeEventHandler, FormEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import { fetchUserStart } from '../../store/user/user.actions';
import { getUserSelector } from '../../store/user/user.seletor';
import { UserIncidental } from '../../store/user/user.types';

import { hintMerge } from '../../utils/hint';
import { updateNameAsync } from '../../utils/processData/user.utils';

export interface ModifyNameProps {
    activeUser: null | UserIncidental,
    closeHandler: MouseEventHandler<HTMLSpanElement>,
    textChangeHandler: ChangeEventHandler<HTMLInputElement>,
    onSubmitHandler: FormEventHandler<HTMLFormElement>,
}

export const withProcess = (Component: ComponentType<ModifyNameProps>) =>
    () => {
        const dispatch = useDispatch();
        const activeUser = useSelector(getUserSelector);
        const navigate = useNavigate();
        const location = useLocation();
        const { pathname } = location;

        useEffect(() => {
            const path = pathname.slice(0, pathname.lastIndexOf('/'));
            const path_uid = path.substring(path.lastIndexOf('/') + 1);

            if (!activeUser || activeUser!.uid !== path_uid) {
                navigate(pathname.slice(0, pathname.lastIndexOf('/')))
            }

        }, [activeUser, pathname, navigate])

        const closeHandler = useCallback(() => {
            navigate(pathname.slice(0, pathname.lastIndexOf('/')))
        }, [pathname, navigate]);

        const textChangeHandler = useCallback((event: React.ChangeEvent) => {
            const target = event.currentTarget as HTMLTextAreaElement;
            if (!target) return;
            const textBox = target.parentElement as HTMLDivElement;
            if (!textBox) return;
            const buttonBox = textBox.nextSibling as HTMLDivElement;
            if (!buttonBox) return;
            const submit = buttonBox.lastChild as HTMLInputElement;
            if (!submit) return;

            submit.style.backgroundColor = "#000";
            submit.style.pointerEvents = "auto";
        }, []);

        const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const formData = new FormData(event.currentTarget);
                const name = formData.get("name") as string;
                const upload: { uid: string, name: string } = {
                    uid: activeUser!.uid,
                    name: name,
                }
                const result = updateNameAsync(upload);
                if (result instanceof Error) {
                    throw result;
                }

                dispatch(fetchUserStart());
                hintMerge("更新完毕，请重进页面");
                navigate("/");
                return null;
            } catch (error) {
                hintMerge((error as Error).message);
            }
        }, [dispatch,activeUser,navigate]);

        const handlers = {
            closeHandler: closeHandler,
            activeUser: activeUser,
            textChangeHandler: textChangeHandler,
            onSubmitHandler: onSubmitHandler,
        }

        return <Component {...handlers} />
    }
