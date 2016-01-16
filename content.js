(function(){
	var pre = document.querySelector("pre"),
		title = document.title+"_"+(document.URL.match(/\d{8}/)||["00000000"])[0],
		data = localStorage.getItem(title) ;

	data?(pre.innerHTML=data):localStorage.setItem(title,pre.innerHTML);
	
	document.addEventListener("keydown",function(e){
		if( e.ctrlKey  == true && e.keyCode == 83 ){
			localStorage.setItem(title,pre.innerHTML);
			e.preventDefault();
			return false;
		}
		return false;
	},false);
	document.addEventListener("click",function(e){
		var target = e.target;
		if(/toggle/.test(target.className)&&!/disabled/.test(target.className)){
			var sib = target.nextElementSibling||{};
			if(/hidden/.test(sib.className)){
				sib.className = sib.className.replace(/\s*hidden/,"");
			}else {
				sib.className += " hidden" ;
			}
		}
	},false);
	pre.addEventListener("dblclick",function(e){
		var target = pre,
		    html = target.innerHTML;
		    if(target.contentEditable===true)return false;
		  	else target.contentEditable = true ;
		target.innerHTML = html.replace(/[<>]/g,function(c){
			return c==="<"?"&lt;":"&gt;";
		});
		target.focus();
	},true);

	pre.addEventListener("blur",function(e){
		var target = pre,
		    html = target.innerHTML;
			target.contentEditable = false;
		target.innerHTML = html.replace(/(&lt;|&gt;)/g,function(c){
			return c==="&lt;"?"<":">";
		});
		localStorage.setItem(title,target.innerHTML);
	},false);

})()