import React from 'react';

// 定义 handler 函数类型
type Handler<T> = (item: T, index: number) => JSX.Element;

export const _run = <T>(
    datas: T[],
    currentIndexRef: React.MutableRefObject<number>,
    setState: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    handler: Handler<T>
) => {
    const dataLength = datas.length;
    requestIdleCallback((idle) => {
        const rendered: JSX.Element[] = [];
        let newIndex = currentIndexRef.current || 0;

        while (idle.timeRemaining() > 0 && newIndex < dataLength) {
            const currentItem = datas[newIndex];
            const renderComponent = handler(currentItem, newIndex);

            rendered.push(renderComponent);
            newIndex++;
        }

        // 更新状态
        setState(prevState => [...prevState, ...rendered]);
        currentIndexRef.current = newIndex;

        // 递归调用
        if (newIndex < dataLength) {
            _run(datas, currentIndexRef, setState, handler);
        }
    });
};