(function(){
	var html = '<div class="chatparts-header"><p>チャット</p></div><div id="spc-messages"></div><input id="spc-content" class="chatparts-textarea" type="text" placeholder="Enterで投稿"></input>';
	function escapeHTML(str) {return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");}
	window.chatpart = {
        start : function(_option) {
            var option = _option || {};
            var host = option.host || "https://io-ehz546bne.mlkcca.com";
            var datastore = option.datastore || "messages";
            var ele = document.createElement("div");
            ele.innerHTML = html;
            ele.className = "chatparts";
            document.body.appendChild(ele);
            var milkcocoa = new MilkCocoa(host);
            var ds = milkcocoa.dataStore(datastore);
            ds.query({}).done(function(e) {
                for(var i=0;i < e.length;i++) {
                    if(!e[i].content) continue;
                    $("#spc-messages").append('<div id="'+e[i].id+'">' + escapeHTML(e[i].content) + "</div>");
                }
            });
            ds.on("push", function(e) {
                $("#spc-messages").append('<div id="'+e.id+'">' + escapeHTML(e.value.content) + "</div>");
            });
            $('#spc-content').keydown(function (e) {
                if (e.which == 13){
                    ds.push({
                        content : escapeHTML($("#spc-content").val())
                    });
                    $("#spc-content").val("");
                    return false;
                }
            });
        }
    }
}())
