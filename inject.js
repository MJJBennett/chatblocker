/* Note: For further reading, reference Chrome documentation:
 * https://developer.chrome.com/extensions/manifest
 * https://developer.chrome.com/extensions/background_pages
 * And so on.
 * This script was created with some code & inspiration from the following tutorial:
 * http://www.nhatqbui.com/programming/2016/11/22/howtobuildatwitchchatchromeext.html
 * 
 * Version 0.1.0:
 *   - Automatically removes all Twitch chat messages with text content
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

var is_blocked = function(text, sender) {

};

var chatLoadedObserver = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        //Currently, the chat window is a div with role="log".
        //Should this change, the JQuery here will need to be updated.
        var chat_messages = $('div[role="log"]');
        //If it exists, we have found the chat window.
        if (chat_messages.length > 0) {
            console.log("ChatBlocker: Found the chat window.");
            chatObserver.observe(chat_messages[0], config);
            observer.disconnect();
        }
    });
});

var chatObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation) {
        console.log("Chat updated!");
        mutation.addedNodes.forEach(function (addedNode) {
            var chatMessage = $(addedNode);
            if (!chatMessage.is(".chat-line__message")) return;
            //chatMessage = chatMessage[0];
            console.log(chatMessage);
            data = chatMessage.children("span[data-a-target='chat-message-text']").each(function (child) {
                //child_message = child[0];
                //console.log("Modifying text.");
                //$(child).text('HELLO!!!');
                //child.parentElement.removeChild(child);
                return [child];
            });
            if (text.length < 1) {
                console.log("Ignored one thing.");
                return;
            }
            console.log($(text).text());
            text.parent().remove();
            //parseMsgHTML(messageElement);
        });
    });
});

//We only want to know when there are updates to the list of children and nothing else.
var config = { attributes: false, childList: true, characterData: false };
chatLoadedObserver.observe(html_body, config);