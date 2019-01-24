//createContexts();

//function createContexts(){
  chrome.contextMenus.remove('add', function() {
chrome.contextMenus.create({
  id:'add',
  title: "Add copy: %s",
  contexts:["selection"],
});

});

//   chrome.contextMenus.remove('paste', function() {
// chrome.contextMenus.create({
//   id:'paste',
//   title: "Paste copy",
//   contexts:["editable"],
// });
// chrome.contextMenus.create({
//   title: 'test',
//   parentId: 'paste',
//   id: 'test',
//   contexts: ["editable"],
// });
//});
// var con = 0;
// var storage = chrome.storage.local;
// storage.get('copies', function(result){
//   var gottenCopies = result.copies;
//   //alert(gottenCopies)
//   for(var i in gottenCopies){
//     chrome.contextMenus.create({
//       title: gottenCopies[i],
//       parentId: 'paste',
//       id: 'pastes' + i,
//       contexts: ["editable"],
//     })
//   }
//   con = i;
// });
// }
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   var storage = chrome.storage.local;
//   for(var i=0; i<=con; i++){
//     chrome.contextMenus.remove('paste' + i, function(){});
//   }
//   storage.get('copies', function(result){
//     var gottenCopies = result.copies;
//     //alert(gottenCopies)
//     for(var i in gottenCopies){
//       chrome.contextMenus.create({
//         title: gottenCopies[i],
//         parentId: 'paste',
//         id: 'pastes' + i,
//         contexts: ["editable"],
//       })
//     }
//   });
// }
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.notifications.create('install', {
        type:'basic',
        iconUrl: 'assets/icon_128_mc_2.png',
        title: 'Welcome to MultiCopy!',
        message:  "Use Ctrl+Shift+A or open the extension to save copies!"

      })
    }
    else if(details.reason == "update"){
      chrome.notifications.create('update', {
        type:'basic',
        iconUrl: 'assets/icon_128_mc_2.png',
        title: 'MultiCopy has been updated!',
        message: " Use Alt+C or open the extension to save copies!"

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

      gottenCopies.unshift(newCopy);

      storage.set({'copies': gottenCopies});

     chrome.notifications.create('copy', {
        type: 'basic',
        iconUrl: 'assets/icon_128_mc.png',
        title: 'Copy Saved',
        message: "The text selection was succesfully added to your MultiCopy Clipboard."
     });

    });
       }
       else if(info.menuItemId == 'paste'){}

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
