import { tweetsData } from "./data.js";

const tweetBtn = document.querySelector('#tweet-btn');
const tweetInput = document.querySelector('#tweet-input');

tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value)
})

document.addEventListener('click', (event) => {
    if(event.target.dataset.like){
        handleLikeClick(event.target.dataset.like)
    }
    else if(event.target.dataset.retweet){
        handleRetweetClick(event.target.dataset.retweet)
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

        if(tweet.replies.length > 0){
            console.log(tweet.uuid)
        }
        
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}/p>
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
            </div>
        `
    })
    
    return feedHtml;
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml();

}

render();