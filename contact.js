(function(){
	var style = "z-index: 99;position: fixed;bottom: 0;right: 0;height: 300px;width: auto;";
	var html = '<div style="'+style+'"><p>Contact</p><textarea id="spc-content" cols="24" rows="4"></textarea><button id="spc-post">Post</button><div id="spc-messages"></div></div>';
	function escapeHTML(str) {return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");}
	window.mlkcca = {
        contact : {
            start : function(option) {
                var host = option.host || "https://demo-contact.mlkcca.com";
                var datastore = option.datastore || "messages";
                datastore
                var ele = document.createElement("div");
                ele.innerHTML = html;
                document.body.appendChild(ele);
                var milkcocoa = new MilkCocoa(host);
                var ds = milkcocoa.DataStore(datastore);
                ds.query({}).done(function(messageStore, e) {
                    for(var i=0;i < e.length;i++) {
                        if(!e[i].content) continue;
                        $("#spc-messages").append('<div id="'+e[i].id+'">' + escapeHTML(e[i].content) + "</div>");
                    }
                });
                ds.on("push", function(e) {
                    $("#spc-messages").append('<div id="'+e.id+'">' + escapeHTML(e.value.content) + "</div>");
                });
                $("#spc-post").click(function() {
                    ds.push({
                        content : $("#spc-content").val()
                    });
                    $("#spc-content").val("");
                });
            }
        }
	}
}())
