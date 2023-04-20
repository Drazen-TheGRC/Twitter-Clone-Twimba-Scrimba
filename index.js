import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from "https://jspm.dev/uuid"



document.addEventListener("click", function(e){

    if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
        
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.id === "tweet-btn"){
        handleTweetClick()
    }
    else if(e.target.dataset.mytweet){
        handleDeleteTweetClick(e.target.dataset.mytweet)
    }

})

function handleReplyClick(tweetId){
    // Check if the button is working 
    console.log("You clicked reply btn with uuid: ", tweetId)

    // Accessing the right tweet and its replies div and then toggling the hidden class ON/OFF
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden")
}

function handleLikeClick(tweetId){
    // Check if the button is working 
    console.log("You clicked like btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Check if object exists
    console.log(targetTweetObj)

    // Increment likes if not already liked otherwise decrement likes
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    // Render after updates
    render() 
}

function handleRetweetClick(tweetId){
    // Check if the button is working 
    console.log("You clicked retweet btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Check if object exists
    console.log(targetTweetObj)

    // Increment likes if not already liked otherwise decrement likes
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    // Render after updates
    render() 
}

function handleTweetClick(){

    const tweetInput = document.getElementById("tweet-input")

    // Check if the button is working 
    console.log("You clicked Tweet btn")

    if(tweetInput.value){
        tweetsData.unshift(
            {
                handle: "@Drazen-TheGRC",
                profilePic: "images/drazen.drinic.jpg",
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            }
        )
    }
    

    // Render
    render()
    // Clear input
    tweetInput.value = ""
}

function handleDeleteTweetClick(tweetId){

    // Check if the button is working 
    console.log("You clicked delete btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Getting tweet index
    let indexOfTweet = tweetsData.indexOf(targetTweetObj)
    // Deleting tweet 
    tweetsData.splice(indexOfTweet, 1)

    // Render after updates
    render() 
}

function getFeedHtml(){
    
    let feedHtml = ""
    
    tweetsData.forEach(function(tweet){

        // Creating replies HTML if there are replies in the tweet
        let repliesHtml = ""
        
        if(tweet.replies.length > 0){

            tweet.replies.forEach(function(reply){

                repliesHtml += 
                `
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

        // Checking if tweet is liked if it is than we add class to the icon to change icon color
        let likeIconClass = ""
        if(tweet.isLiked){
            likeIconClass = "liked"
        }
        // Checking if tweet is retweeted if it is than we add class to the icon to change icon color
        let retweetIconClass = ""
        if(tweet.isRetweeted){
            retweetIconClass = "retweeted"
        }

        let myTweetDeleteBtnClass = ""
        if(tweet.handle != "@Drazen-TheGRC"){
            myTweetDeleteBtnClass = "hidden"
        }
        
        // Building HTML
        feedHtml += 
        `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <i class="close-btn fa-solid fa-xmark ${myTweetDeleteBtnClass}" data-mytweet="${tweet.uuid}"></i>

                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots " data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div id="replies-${tweet.uuid}" class="hidden">
                    <!-- REPLIES HERE -->
                    ${repliesHtml}
                </div>
            </div>
        `
   })

   // Rendering 
   return feedHtml

}



function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()
}



render()