/* Note: For further reading, reference Chrome documentation:
 * https://developer.chrome.com/extensions/manifest
 * https://developer.chrome.com/extensions/background_pages
 * And so on.
 * This script was created with some code & inspiration from the following tutorial:
 * http://www.nhatqbui.com/programming/2016/11/22/howtobuildatwitchchatchromeext.html
 * 
 * Version 0.1.3:
 *   - Removes messages if the is_blocked(text, sender) returns true for that message. 
 * 
 * Future development should allow for the creation of regexes in order to properly parse
 * and remove messages based on word, text, and username blacklists (and, potentially, 
 * whitelists as well, should they be necessary)
 */

//Get the HTML body, where we will search for the chat window
var html_body = $("body")[0];

//This may not be necessary:
//debugger;

//Some persistent variables
var hidden_messages = 0;

function fetch_conf(url) {
    return fetch(url)
}

const confurl = chrome.runtime.getURL('data/conf.json');
var config;

//We only want to know when there are updates to the list of children and nothing else.
var obs_config = { attributes: false, childList: true, characterData: false };

var is_blocked = function(text, sender) {
    for (var i = 0; i < config.block_if_contains.length; i++) {
        if (text.includes(config.block_if_contains[i])) return true;
    }
    for (var i = 0; i < config.block_if_user.length; i++) {
        if (sender == config.block_if_user[i]) return true;
    }
    for (var i = 0; i < config.block_if_is.length; i++) {
        //Case insensitive
        if (text.toLowerCase() == config.block_if_is[i].toLowerCase()) return true;
    }
    return false;
};

function parse_text(message) {
    //chatMessage.children("span[data-a-target='chat-message-text']").text();
    text = "";
    message.children("span").each(function(){
        if ($(this).attr("data-a-target") == "chat-message-text" || $(this).attr("data-a-target") == "emote-name") {
            if ($(this).attr("data-a-target") == "chat-message-text") {
                text = text + $(this).text();
            }
            else {
                text = text + $(this).children("img").attr("alt");
            }
        }
    });
    return text;
}

var chatLoadedObserver = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        //Currently, the chat window is a div with role="log".
        //Should this change, the JQuery here will need to be updated.
        var chat_messages = $('div[role="log"]');
        //If it exists, we have found the chat window.
        if (chat_messages.length > 0) {
            console.log("ChatBlocker: Found the chat window.");
            chatObserver.observe(chat_messages[0], obs_config);
            observer.disconnect();
        }
    });
});

var chatObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation) {
        //console.log("Chat updated!");
        mutation.addedNodes.forEach(function (addedNode) {
            var chatMessage = $(addedNode);
            if (!chatMessage.is(".chat-line__message")) return;
            //console.log(chatMessage);
            //text = chatMessage.children("span[data-a-target='chat-message-text']").text();
            text = parse_text(chatMessage);
            sender = chatMessage.children(".chat-line__username").find(".chat-author__display-name").attr("data-a-user");
            //console.log(sender);
            //console.log(text);
            if (is_blocked(text, sender)) {
                if (++hidden_messages %config.notify_on_every_x_messages == 0) console.log("Have now hidden " + hidden_messages + " messages!"); 
                chatMessage.hide();
            }
        });
    });
});

fetch(confurl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    config = json;
    chatLoadedObserver.observe(html_body, obs_config);
  });