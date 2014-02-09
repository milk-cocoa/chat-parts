(function(){
	var style = "z-index: 99;position: fixed;bottom: 0;right: 0;height: 300px;width: auto;";
	var html = '<div style="'+style+'"><p>Contact</p><textarea id="spc-content" cols="24" rows="4"></textarea><button id="spc-post">Post</button><div id="spc-messages"></div></div>';
	function escapeHTML(str) {return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");}
	window.speedchat = {
			start : function(app_id) {
				var ele = document.createElement("div");
				ele.innerHTML = html;
				document.body.appendChild(ele);
				
                pour_the_milk("mlkcca.com", app_id, function() {
                    var ds = new milkcocoa.DataStore("root");
                    ds.child("messages").findMany(-7, 7, function(messageStore, e) {
                        for(var i=0;i < e.length;i++) {
                        	if(!e[i].content) continue;
                            $("#spc-messages").append('<div id="'+e[i].id+'">' + escapeHTML(e[i].content) + "</div>");
                        }
                    });
                    ds.child("messages").on("push", function(e) {
                        $("#spc-messages").append('<div id="'+e.id+'">' + escapeHTML(e.content) + "</div>");
                    });
                    $("#spc-post").click(function() {
                        ds.child("messages").push({
                            content : $("#spc-content").val()
                        }, function(e) {
                            $("#spc-content").val("");
                        });
                    });
                });
			}
	}
}())
