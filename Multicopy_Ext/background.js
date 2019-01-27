//createContexts();

//function createContexts(){
reloadAllContexts();
function reloadAllContexts(){
  chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
      id:'paste',
      title: "Paste copy",
      contexts:["editable"],
    },
  pasteContext());
  chrome.contextMenus.create({
    id:'add',
    title: "Add copy: %s",
    contexts:["selection"],
  });
}

function pasteContext(){
  var storage = chrome.storage.local;
    storage.get('copies', function(result){
      var gottenCopies = result.copies;
      newarray = gottenCopies.reverse();
      console.log(newarray);
      for(var i in newarray){

              chrome.contextMenus.create({
                title: newarray[i],
                parentId: 'paste',
                id: 'pastes,' + i  + ','+ newarray[i],
                contexts: ["editable"],
              })
          }
    });
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
  reloadAllContexts();
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.notifications.create('install', {
        type:'basic',
        iconUrl: 'assets/icon_128_mc_2.png',
        title: 'Welcome to MultiCopy!',
        message:  "Alt+C to copy. Right click menu to copy & paste!"

      })
    }
    else if(details.reason == "update"){
      chrome.notifications.create('update', {
        type:'basic',
        iconUrl: 'assets/icon_128_mc_2.png',
        title: 'MultiCopy has been updated!',
        message: "Alt+C to copy. Right click menu to copy & paste!"

      })
    }
});
chrome.contextMenus.onClicked.addListener(function(info, tab) {
      if(info.menuItemId=='add'){
        var storage = chrome.storage.local;
    var newCopy  = info.selectionText;

    storage.get('copies', function(result){
      var gottenCopies = result.copies;
      if(!gottenCopies){

        gottenCopies = [];
      }

      gottenCopies.push(newCopy);

      storage.set({'copies': gottenCopies});

     chrome.notifications.create('copy', {
        type: 'basic',
        iconUrl: 'assets/icon_128_mc.png',
        title: 'Copy Saved',
        message: "The text selection was succesfully added to your MultiCopy Clipboard."
     });

    });
       }
       else if(info.menuItemId.indexOf('paste') != -1){
         var storage = chrome.storage.local;

     storage.get('copies', function(result){
       var gottenCopies = result.copies;
       var currentcopy = gottenCopies.reverse()[Number(info.menuItemId.split(',')[1])]
       chrome.tabs.executeScript( {
         code: "var focused = document.activeElement; focused.value = ' " + currentcopy + "';"
       })
     });

}
});

chrome.commands.onCommand.addListener(function(command) {

  if(command === "copy_to_clipboard"){
    chrome.tabs.executeScript( {
      code: "window.getSelection().toString();"
    }, function(selection) {
      if(selection){
        var newCopy = selection;
        //alert(newCopy)
        var storage = chrome.storage.local;
        storage.get('copies', function(result){
            var oldCopies = result.copies;
            if(!oldCopies){
              oldCopies = [];
            }
            oldCopies.unshift(newCopy);
            var storage = chrome.storage.local;
            //alert(oldCopies);
            //alert(storage);
            storage.set({'copies': oldCopies});
            chrome.notifications.create('Copy', {
              type:'basic',
              iconUrl: 'assets/icon_128_mc_2.png',
              title: 'Copy Saved!',
              message: 'The text selection was succesfully added to your MultiCopy Clipboard.'

            })

        })
      }
    });
       };

});
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        // if(request.msg == "reloadContext"){
        //   //alert('test');
        //
        // }
    }
);
// function reloadContext(){
//   //alert('falla')
//   try{
//     chrome.contextMenus.remove('paste', function() {
//   chrome.contextMenus.create({
//     id:'paste',
//     title: "Paste copy",
//     contexts:["editable"],
//   },
//   pasteContext());
//   // chrome.contextMenus.create({
//   //   title: 'test',
//   //   parentId: 'paste',
//   //   id: 'test',
//   //   contexts: ["editable"],
//   // });
//   }, function(){alert('callback!')});
//   }
//   catch(err){
//     chrome.contextMenus.create({
//       id:'paste',
//       title: "Paste copy",
//       contexts:["editable"],
//     },
//   pasteContext());
//   }
//   //pasteContext();
//
// }
