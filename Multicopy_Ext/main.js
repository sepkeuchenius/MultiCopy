
$(document).ready(function() { /* code here */
getStorage();
$('#feedback').on('click', function(){
  chrome.tabs.create({url:'https://chrome.google.com/webstore/detail/multicopy-clipboard/fahoojlhneomlloahghepkcegggkpahh'});
})

$('#copy').focus();
var snackbarContainer = document.querySelector('#demo-snackbar-example');
        Math.floor(Math.random() * 0xFFFFFF).toString(16);
    var data = {
      message: 'Welcome back, all copies loaded',
      timeout: 2000,
      actionHandler: function(){},
      actionText: 'OK'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});
var storage = chrome.storage.local;


function search(){
   var input, filter,li, a, m;
    input = document.getElementById('fixed-header-drawer-exp');
 filter = input.value.toUpperCase();
    input = filter;
    var size = document.getElementsByTagName('ul').length - 1;
    var ul = $('ul').each(function(k){
    li = $(this).find('li').each(function(){
      var text = $(this).text();
      text = text.toUpperCase();
      if(text.indexOf(input) == -1){
        $(this).css('display', 'none');
        var classname = $(this).attr('class');
        if(classname.indexOf('head') != -1 ){
          $(this).css('display', '');
        }
      }
      else{
        $(this).css('display', '');
      }

    });
    if(k == size){
      loading('stop');
    }
    });

}

function id(e){
  return document.getElementById(e);
}
id('addbutton').addEventListener('click', addCopy, false);

id('copy').addEventListener('click', function(){
  if(id('copy').value == 'write something'){

    id('copy').value = '';


  }
  else{}
}, false);

id('copy').onkeypress = function(e) {
    if(e.keyCode == 13) {
        addCopy();
    }


};

function addCopy(copy){
  var copyText;
  if(!copy){
    copyText = id('copy').value;

  }
  else if(copy.length >0){
    copyText = copy;

  }
  else{
    if(id('copy').value.length > 0){
    copyText = id('copy').value;
    }
  }
  if(copyText){
  console.log(copyText);
 var hr = document.createElement('hr');
  var li = document.createElement('li');
 li.className = 'mdl-list__item';
 var span = document.createElement('span');
 span.className = 'mdl-list__item-primary-content';
 span.innerText = copyText;
 span.setAttribute('id', 'copytext');
  var ul = id('list');
  li.appendChild(span);
 var secondary = document.createElement('span');
 secondary.className = "mdl-list__item-secondary-action";
 var button = document.createElement('button');
 button.className = "mdl-button mdl-js-button mdl-button--icon";
 var icon = document.createElement('i');
 icon.className = "material-icons delete";
 icon.innerHTML = 'delete';
 button.appendChild(icon);
 var copybutton = document.createElement('button');
 copybutton.className = "mdl-button mdl-js-button mdl-button--icon";
 var copyicon = document.createElement('i');
 copyicon.className = "material-icons copy";
 copyicon.innerHTML = 'content_copy';
 copybutton.appendChild(copyicon);
 secondary.appendChild(copybutton);
 secondary.appendChild(button);
  li.appendChild(secondary);
 $('ul').prepend(li);
 //$('li').prepend(secondary)
 //$(secondary).appendTo($("li"))

  // li.innerHTML += '<span class="mdl-list__item-secondary-action"> <button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">delete</i>';

  button.addEventListener('click', function(){
    var copyToDelete = this.parentNode.parentNode;
    console.log(copyToDelete)
    var copyBody = copyToDelete.parentNode;
   copyBody.removeChild(copyToDelete);
  // this.parentNode.parentNode.removeChild()
   var snackbarContainer = document.querySelector('#demo-snackbar-example');
        Math.floor(Math.random() * 0xFFFFFF).toString(16);
    var data = {
      message: 'Copy deleted',
      timeout: 2000,
      actionHandler: function(){
        console.log(copyToDelete);
        copyBody.appendChild(copyToDelete)
        setStorage()
      },
      actionText: 'UNDO'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    setStorage();
  });
  copybutton.addEventListener('click', function(){
    var copytext = this.parentNode.parentNode.childNodes[0].innerHTML;
    console.log(copytext);
    id('copier').value = copytext;
    id('copier').focus();
    id('copier').select();
    document.execCommand("Copy");

  var snackbarContainer = document.querySelector('#demo-snackbar-example');
        Math.floor(Math.random() * 0xFFFFFF).toString(16);
    var data = {
      message: 'Text copied',
      timeout: 2000,
      actionHandler: function(){},
      actionText: 'OK'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
//  ul.appendChild(li);
  // ul.appendChild(hr);
   id('copy').value = '';
   //id('add').className = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded';
   id('copy').focus();
setStorage();

}}
function setStorage(){
  var copyes = document.getElementsByTagName('li');
  var copies = [];
  for(var i=0; i<copyes.length; i++){
    var copy = copyes[i].childNodes[0].innerHTML;
    console.log(copy);
  // console.log(copy);
    copies.unshift(copy);
  }
  console.log(copies);
  storage.set({'copies': copies});
  // storage.get({'copies': []}, function(result){
  //   var gottenCopies = result.copies;
  //   // console.log(gottenCopies);
  // });}
}
  function getStorage(){
    storage.get('copies', function(result){
    var gottenCopies = result.copies;
    if(!gottenCopies){
      gottenCopies = ['Your first copy!'];
    }
    console.log(gottenCopies);
    var previousCopies = gottenCopies;
    for(var j=0; j<gottenCopies.length; j++){
    addCopy(gottenCopies[j]);
}
  });




  }
