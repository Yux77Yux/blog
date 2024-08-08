import React, { ChangeEventHandler, ComponentType, DragEventHandler, FormEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserStart } from '../../store/user/user.actions';
import { getUserSelector } from '../../store/user/user.seletor';

import { updateProfileAsync } from '../../utils/processData/user.utils';
import './modifyProfile.styles.scss';
import { hintMerge } from '../../utils/hint';

export interface ModifyProfileProps {
    closeHandler: MouseEventHandler<HTMLSpanElement>,
    changeHandler: ChangeEventHandler<HTMLInputElement>,
    clickHandler: MouseEventHandler<HTMLDivElement>,
    dragOverHandler: DragEventHandler<HTMLDivElement>,
    dragEnterHandler: DragEventHandler<HTMLDivElement>,
    dragLeaveHandler: DragEventHandler<HTMLDivElement>,
    dropHandler: DragEventHandler<HTMLDivElement>,
    imgMouseDownHandler: MouseEventHandler<HTMLImageElement>,
    imgMouseUpHandler: MouseEventHandler<HTMLImageElement>,
    imgMouseLeaveHandler: MouseEventHandler<HTMLImageElement>,
    imgMouseMoveHandler: MouseEventHandler<HTMLImageElement>,
    trimHandler: MouseEventHandler<HTMLInputElement>,
    no_trimHandler: MouseEventHandler<HTMLInputElement>,
    fineHandler: MouseEventHandler<HTMLInputElement>,
    onSubmitHandler: FormEventHandler<HTMLFormElement>,
    activeProfile: string,
    newProfile: string,
}

export const withProcess = (Component: ComponentType<ModifyProfileProps>) =>
    () => {
        const dispatch = useDispatch();
        const activeUser = useSelector(getUserSelector);
        const [activeProfile, setProfile] = useState("");
        const [newProfile, setNewProfile] = useState("");
        const [file, setFile] = useState<null | File>(null);
        const [drag, setDrag] = useState(false);
        const ref = useRef({
            prevLeft: 0,
            prevTop: 0,
            newLeft: 0,
            newTop: 0,
            maxHeight: 0,
            maxWidth: 0,
            baseLeft: 0,
            baseTop: 0,
        })
        const navigate = useNavigate();
        const location = useLocation();
        const { pathname } = location;

        useEffect(() => {
            const path = pathname.slice(0, pathname.lastIndexOf('/'));
            const path_uid = path.substring(path.lastIndexOf('/') + 1);

            if (!activeUser || activeUser!.uid !== path_uid) {
                navigate(pathname.slice(0, pathname.lastIndexOf('/')))
            }

            setProfile(() => activeUser!.profile || require('../../assets/mingchao2.svg').default);
            setNewProfile(() => activeUser!.profile || require('../../assets/mingchao2.svg').default);
        }, [activeUser, pathname, navigate])

        const updateProgressBar = useCallback((percentComplete: number) => {
            const progressBar = document.querySelector('.progress-bar') as HTMLElement;
            progressBar.style.width = percentComplete + '%';
            progressBar.textContent = Math.round(percentComplete) + '%';
        }, []);

        const simulateFileUpload = useCallback((file: File) => {
            return new Promise((resolve, reject) => {
                const totalSize = file.size;
                let loadedSize = 0;
                const chunkSize = totalSize / 100; // Simulate progress in chunks (1% each)

                const progressInterval = setInterval(() => {
                    if (loadedSize >= totalSize) {
                        clearInterval(progressInterval);
                        updateProgressBar(100);
                        resolve(true); // Notify that upload simulation is complete
                    } else {
                        loadedSize += chunkSize;
                        const percentComplete = Math.min((loadedSize / totalSize) * 100, 100);
                        updateProgressBar(percentComplete);
                    }
                }, 10); // Update every 10ms
            });
        }, [updateProgressBar]);

        const closeHandler = useCallback(() => {
            navigate(pathname.slice(0, pathname.lastIndexOf('/')))
        }, [pathname, navigate]);

        const changeHandler = useCallback(() => {
            const fileInput = document.querySelector("#profile-file") as HTMLInputElement;
            const preview = document.querySelector(".profile-preview") as HTMLDivElement;
            const previewImg = document.querySelector(".profile-preview-img") as HTMLImageElement;
            const newProfileRadius = document.querySelector(".new-profile-radius") as HTMLImageElement;
            const new_profile = document.querySelector(".new-profile") as HTMLImageElement;
            const submit = document.querySelector(".submit") as HTMLInputElement;
            if (!newProfileRadius || !new_profile || !submit || !previewImg || !preview || !fileInput || fileInput.files!.length === 0) return;

            newProfileRadius.style.display = "none";
            new_profile.style.display = "none";
            submit.style.backgroundColor = "rgb(109, 109, 109)";
            submit.style.pointerEvents = "none";

            const file = fileInput.files![0];
            simulateFileUpload(file);
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const img = new Image();
                img.onload = function () {
                    const width = img.width;
                    const height = img.height;
                    previewImg.style.width = `${width}px`;
                    previewImg.style.height = `${height}px`;

                    ref.current.maxHeight = height - preview.offsetHeight;
                    ref.current.maxWidth = width - preview.offsetWidth;
                };

                img.src = e.target!.result as string;
                previewImg.src = img.src as string;
            }
            reader.readAsDataURL(file);
        }, [simulateFileUpload]);

        const clickHandler = useCallback(() => {
            const target = document.querySelector("#profile-file") as HTMLInputElement;
            if (!target) return;
            target.click();
        }, []);

        const dragOverHandler = useCallback((event: React.DragEvent) => {
            event.preventDefault();
        }, []);

        const dragEnterHandler = useCallback((event: React.DragEvent) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            if (!target) return;
            target.style.backgroundColor = "rgb(112, 112, 112)";
        }, []);

        const dragLeaveHandler = useCallback((event: React.DragEvent) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            if (!target) return;
            target.style.backgroundColor = "transparent";
        }, []);

        const dropHandler = useCallback((event: React.DragEvent) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            if (!target) return;
            const targetFiles = event.dataTransfer;
            const fileInput = document.querySelector("#profile-file") as HTMLInputElement;
            if (!targetFiles.types.includes("Files")) {
                alert("仅支持文件");
                return;
            }
            if (targetFiles.files.length !== 1) {
                alert("仅支持单个文件");
                return;
            }
            const file = targetFiles.files[0];
            if (file.size >= 1024 * 1024 * 20) {
                alert("图片大小小于20MB");
                return;
            }
            if (!file.type.includes("image/")) {
                alert('必须是常见的图片格式，如"JPEG/JPG,PNG,GIF,WEBP,SVG,BMP,TIFF,TIF"');
                return;
            }
            fileInput.files = targetFiles.files;
            changeHandler();
            target.style.backgroundColor = "transparent";
        }, [changeHandler]);

        const imgMouseDownHandler = useCallback((event: React.MouseEvent) => {
            event.preventDefault();
            setDrag(true);
            ref.current.baseLeft = event.clientX;
            ref.current.baseTop = event.clientY;

            // const circleBox = document.querySelector(".circleBox") as HTMLElement;
        }, [setDrag]);

        const imgMouseUpHandler = useCallback((event: React.MouseEvent) => {
            event.preventDefault();
            setDrag(false);
            ref.current.prevLeft = ref.current.newLeft;
            ref.current.prevTop = ref.current.newTop;
        }, [setDrag]);

        const imgMouseLeaveHandler = useCallback((event: React.MouseEvent) => {
            event.preventDefault();
            setDrag(false);
            ref.current.prevLeft = ref.current.newLeft;
            ref.current.prevTop = ref.current.newTop;
        }, [setDrag]);

        const imgMouseMoveHandler = useCallback((event: React.MouseEvent) => {
            event.preventDefault();
            const img = event.target as HTMLImageElement;
            const preview = document.querySelector(".profile-preview") as HTMLDivElement;
            if (!drag || !img || !preview) return;

            const moveLeft = ref.current.baseLeft - event.clientX;
            const moveTop = ref.current.baseTop - event.clientY;

            ref.current.newLeft = ref.current.prevLeft + moveLeft;
            ref.current.newLeft = ref.current.newLeft > ref.current.maxWidth ? ref.current.maxWidth : ref.current.newLeft;
            ref.current.newLeft = ref.current.newLeft < 0 ? 0 : ref.current.newLeft;

            ref.current.newTop = ref.current.prevTop + moveTop;
            ref.current.newTop = ref.current.newTop > ref.current.maxHeight ? ref.current.maxHeight : ref.current.newTop;
            ref.current.newTop = ref.current.newTop < 0 ? 0 : ref.current.newTop;

            preview.scrollLeft = ref.current.newLeft;
            preview.scrollTop = ref.current.newTop;
        }, [drag]);

        const cropImage = useCallback(() => {
            const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
            const circleBox = document.querySelector(".circleBox") as HTMLElement;
            const image = document.querySelector(".profile-preview-img") as HTMLImageElement;
            const resultImg = document.querySelector("#resultImg") as HTMLImageElement;
            if (!canvas || !circleBox || !image || !resultImg) return;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                // 设置画布尺寸为裁切区域的尺寸
                canvas.width = circleBox.offsetWidth;
                canvas.height = circleBox.offsetHeight;

                // 绘制裁切区域
                ctx.drawImage(
                    image,
                    ref.current.prevLeft, // 源图像的左上角 x 坐标
                    ref.current.prevTop, // 源图像的左上角 y 坐标
                    circleBox.offsetWidth, // 源图像的裁切区域宽度
                    circleBox.offsetHeight, // 源图像的裁切区域高度
                    0,   // 目标画布的左上角 x 坐标
                    0,   // 目标画布的左上角 y 坐标
                    circleBox.offsetWidth, // 目标画布的宽度
                    circleBox.offsetHeight  // 目标画布的高度
                );

                const croppedImageUrl = canvas.toDataURL('image/png');
                setNewProfile(() => croppedImageUrl);
            }
        }, [setNewProfile]);

        const trimHandler = useCallback((event: React.MouseEvent) => {
            event.preventDefault();

            const newProfileRadius = document.querySelector(".new-profile-radius") as HTMLImageElement;
            const new_profile = document.querySelector(".new-profile") as HTMLImageElement;
            const submit = document.querySelector(".submit") as HTMLInputElement;
            const profile = document.querySelector("#profile-file") as HTMLInputElement;
            if (!newProfileRadius || !new_profile || !submit || !profile) return;

            newProfileRadius.style.display = "none";
            new_profile.style.display = "none";
            submit.style.backgroundColor = "rgb(109, 109, 109)";
            submit.style.pointerEvents = "none";

            cropImage();
            const fine = document.querySelector(".fine") as HTMLInputElement;
            const resultImg = document.querySelector("#resultImg") as HTMLImageElement;
            if (!fine || !resultImg) return;
            fine.style.display = "block";
            resultImg.style.display = "block";
        }, [cropImage]);

        const no_trimHandler = useCallback((event: React.MouseEvent) => {
            event.preventDefault();
            const newProfileRadius = document.querySelector(".new-profile-radius") as HTMLImageElement;
            const new_profile = document.querySelector(".new-profile") as HTMLImageElement;
            const submit = document.querySelector(".submit") as HTMLInputElement;
            const profile = document.querySelector("#profile-file") as HTMLInputElement;
            if (!newProfileRadius || !new_profile || !submit || !profile) return;

            newProfileRadius.style.display = "none";
            new_profile.style.display = "none";
            submit.style.backgroundColor = "rgb(109, 109, 109)";
            submit.style.pointerEvents = "none";

            const fine = document.querySelector(".fine") as HTMLInputElement;
            const resultImg = document.querySelector("#resultImg") as HTMLImageElement;
            const image = document.querySelector(".profile-preview-img") as HTMLImageElement;
            if (!fine || !resultImg || !image) return;

            setNewProfile(() => image.src);

            fine.style.display = "block";
            resultImg.style.display = "block";
        }, []);

        const fineHandler = useCallback(async (event: React.MouseEvent) => {
            const newProfileRadius = document.querySelector(".new-profile-radius") as HTMLImageElement;
            const new_profile = document.querySelector(".new-profile") as HTMLImageElement;
            const submit = document.querySelector(".submit") as HTMLInputElement;
            const profile = document.querySelector("#profile-file") as HTMLInputElement;
            if (!newProfileRadius || !new_profile || !submit || !profile) return;

            newProfileRadius.style.display = "block";
            new_profile.style.display = "block";
            submit.style.backgroundColor = "#000";
            submit.style.pointerEvents = "auto";

            const blob = await fetch(newProfile).then(res => res.blob());
            const file = new File([blob], activeUser!.uid + new Date().toISOString() + ".png", { type: 'image/png' });
            setFile(() => file);
        }, [newProfile, activeUser]);

        const onSubmitHandler = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const profile = file;
                if (!profile) return;

                const upload: { id: number, profile: File } = {
                    id: activeUser!.id,
                    profile: profile
                }

                const result = await updateProfileAsync(upload);
                if (result instanceof Error) {
                    throw result;
                }

                dispatch(fetchUserStart());
                hintMerge("更新完毕，请重进页面");
                navigate("/");
                return null;
            } catch (error) {
                console.error((error as Error).message);
            }
        }, [dispatch, activeUser, file,navigate]);

        const imgBanWheelMove = useCallback((event: WheelEvent) => {
            event.preventDefault();
        }, []);

        useEffect(() => {
            const preview = document.querySelector(".profile-preview") as HTMLDivElement;

            if (preview) {
                preview.addEventListener('wheel', imgBanWheelMove, { passive: false });

                return () => {
                    if (preview) {
                        preview.removeEventListener('wheel', imgBanWheelMove);
                    }
                };
            }
        }, [imgBanWheelMove]);

        const handlers = {
            closeHandler: closeHandler,
            changeHandler: changeHandler,
            clickHandler: clickHandler,
            dragOverHandler: dragOverHandler,
            dragEnterHandler: dragEnterHandler,
            dragLeaveHandler: dragLeaveHandler,
            dropHandler: dropHandler,
            imgMouseDownHandler: imgMouseDownHandler,
            imgMouseUpHandler: imgMouseUpHandler,
            imgMouseLeaveHandler: imgMouseLeaveHandler,
            imgMouseMoveHandler: imgMouseMoveHandler,
            trimHandler: trimHandler,
            no_trimHandler: no_trimHandler,
            fineHandler: fineHandler,
            onSubmitHandler: onSubmitHandler,
            activeProfile: activeProfile,
            newProfile: newProfile,
        }

        return <Component {...handlers} />
    }

