alert("HELLO? ANYONE OUT THERE?");
var html_body = $("body")[0];
var config = { attributes: false, childList: true, characterData: false };
var chatLoadedObserver = new MutationObserver(function (mutations, observer) {
    //http://www.nhatqbui.com/programming/2016/11/22/howtobuildatwitchchatchromeext.html
    mutations.forEach(function (mutation) {
        console.log("Found chat.");
        var chat_messages = $("div[role='log']");
        blocked_obs.observe(target, config);
        observer.disconnect();
    });
});

var chatObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation) {
        console.log("Chat updated!");
// A chat message would be an added node
mutation.addedNodes.forEach(function (addedNode) {
    // At this point it's potentially a chatMessage object.
    var chatMessage = $(addedNode);
    if (!chatMessage.is(".chat-line__message")) {
      // this isn't a chat message, skip processing.
      return;
    }
    // Grab the actual span element with the message content
    //var messageElement = chatMessage.children(twitchChatMessageContent);
    console.log(chatMessage);
    //parseMsgHTML(messageElement);
  });
    });
});

chatLoadedObserver.observe(html_body, config);

/*function removeElementsByClassName(names) {
    var els = document.getElementsByClassName(names),
        i, element;
    for (i = els.count - 1; i > 0; i -= 1) {
        element = els[i];
        element.parentElement.removeChild(element);
    }
}*/