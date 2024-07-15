import ArticleCardFlow from '../../components/articleCardFlow/articleCardFlow.component'

import './home.styles.scss';

const Home = () => {
    const articles = {
        1: [
            {
                Id: 1,
                cardClassName: "articleCardMedium",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitle",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 2,
                cardClassName: "articleCardSmall",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitle",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 3,
                cardClassName: "articleCardMedium",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitle",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
        ],
        2: [
            {
                Id: 4,
                cardClassName: "articleCardLarg",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitleHighLight",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 5,
                cardClassName: "articleCardSmall",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitle",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
        ],
        3: [
            {
                Id: 6,
                cardClassName: "articleCardSmall",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitleHighLight",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 7,
                cardClassName: "articleCardMedium",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitle",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 8,
                cardClassName: "articleCardMedium",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitleHighLight",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
        ],
        4: [
            {
                Id: 9,
                cardClassName: "articleCardLarg",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitleHighLight",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 10,
                cardClassName: "articleCardLarg",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitleHighLight",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
        ],
        5: [
            {
                Id: 11,
                cardClassName: "articleCardMedium",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitle",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
            {
                Id: 12,
                cardClassName: "articleCardMedium",
                author: "匿名",
                authorProfilePath: "mingchao2.svg",
                contentImage: "",
                articleTitleClassName: "articleTitleHighLight",
                articleTitleContent: "【灌水】新款阿布！有谁入手了没？调查员和生姜们常挂在嘴边的东西是森么？调查员和生姜们常挂在嘴边的东西是森么？",
                articleContent: "调查员和生姜们常挂在嘴边的东西是森么？",
            },
        ],
    }

    return (
        <div className="homeBox">
            <ArticleCardFlow articleCardFlows={articles} />
        </div>
    );
}

export default Home;