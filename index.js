import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', (event) => {

    if(event.target.dataset.like){
        handleLikeClick(event.target.dataset.like);
    }
    else if(event.target.dataset.retweet){
        handleRetweetClick(event.target.dataset.retweet);
    }
    else if(event.target.dataset.reply){
        handleReplyClick(event.target.dataset.reply);
    }
    else if(event.target.id === 'tweet-btn'){
        handleTweetBtn();
    }
})

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked;

    render();
    
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0]

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--;
    }
    else{
        targetTweetObj.retweets++;
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

    render();
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtn(){
    const tweetInput = document.querySelector('#tweet-input');

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Gong ✅`,
            profilePic: `images/gong.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render();
    }

    tweetInput.value = "";
}

function getFeedHtml(){
    let feedHtml = "";

    tweetsData.forEach( (tweet) => {
        let likeClassIcon = '';
        let retweetClassIcon = '';

        if(tweet.isLiked){
            likeClassIcon = 'liked'
        }

        if(tweet.isRetweeted){
            retweetClassIcon = 'retweeted'
        }

        let repliesHtml = '';

        if(tweet.replies.length > 0){
            tweet.replies.forEach((reply) => {
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `
            })
        }
        
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeClassIcon}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetClassIcon}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>  
            </div>
        `
    })
    
    return feedHtml;
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml();
}

render();