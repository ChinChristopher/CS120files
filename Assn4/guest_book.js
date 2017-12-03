var numUpdates = 0

function updateMessages() {
    numUpdates++
    $.getJSON("http://cs120.liucs.net/assn4/messages.json", "", function(data){
        var buf = ""
        for( var i = 0; i < data.length; i++) {
            //buf = buf + "<br>MSG: " + data[i].text.replace("<", "&lt;")
            buf = "<tr><td>" + data[i].sender + "</td><td>" + data[i].mood + "</td><td>" + data[i].text.replace("<", "&lt;") + "</td></tr>"
            $(".table").append(buf)
        }
    })
    // Call this function again after 10s delay
    setTimeout(updateMessages, 10000)
}

$(function(){
    console.log("READY TO GO.")
    $("#post").click(function(event){
        event.preventDefault()
        console.log("YOU CLICKED.")
        var sender = $("#sender").val()
        var message = $("#message").val()
        var mood = $("#mood").val()
        console.log([sender, message, mood])
        var obj = {sender: sender, text: message}
        if(mood.length > 0){
          obj = {sender: sender, text: message, mood: mood}
        }
        console.log(obj)
        if((message.length == 0) || (sender.length == 0)){
          if(message.length == 0){
            alert("Empty Message Field!")
          }
          if(sender.length == 0){
            alert("Empty Message Field!")
          }
        }
        else if ((message.length > 0) && (sender.length > 0)) {
          $.ajax({
              url: "http://cs120.liucs.net/assn4/messages.json",
              type: "POST",
              data: JSON.stringify(obj),
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(){
                  console.log("SUCCESS, posted to server")
              }
          })
        }
    })
    updateMessages()
})
$("#mood").keyup(function(){
    var prefix = $(this).val()
    if(prefix == "") return
    $.getJSON("http://cs120.liucs.net/assn4/messages.json", "", function(data){
        console.log("SUCCESS", data)
        $("#words").empty()
        for(var i = 0; i < data.length; i++) {
            var w = data[i].mood
            $("#words").append("<option value='"+ w +"'>")
        }
    })
})
