//datas为数据组，currentIndexRef为useRef，setState是useState Hook，handler是渲染程序部分

export const _runAsync = async (datas, currentIndexRef, setState, handler) => {
    const dataLength = Object.entries(datas).length;
    await new Promise((resolve) => {
        requestIdleCallback(async (idle) => {
            const rendered = [];
            let newIndex = !currentIndexRef.current ? 0 : currentIndexRef.current;

            while (idle.timeRemaining() > 0 && newIndex < dataLength) {
                const currentItem = datas[newIndex];
                const renderComponent = await handler(currentItem, newIndex);

                rendered.push(renderComponent);
                newIndex++;
            }

            // 更新状态
            setState((prevState) => [...prevState, ...rendered]);
            currentIndexRef.current = newIndex;

            // 递归调用
            if (newIndex < dataLength) {
                _runAsync(datas, currentIndexRef, setState, handler);
            }

            resolve();
        });
    });
}