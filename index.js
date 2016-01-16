window.onload=function() {
		var sidebar = document.querySelector(".left"),
			frameWrap=document.querySelector(".frame-wrap") ,
			iframe = document.querySelector("#iframe"),
			currentItem = document.querySelector(".nav-item a"),
			timer ;
		document.addEventListener("click",function(e){
			var target = e.target,
				pNode = target.parentNode,
				className = pNode.className;
			if(/nav-item/.test(className)&&!/active/.test(className)){
				e.stopPropagation();
				loadDoc(target);
				document.body.offsetWidth<450&&(sidebar.className=sidebar.className+" hidden");
			}
			/toggleSide/.test(target.className)&&toggleSidebar();
		},false);

		currentItem.click();

		function bindFrameLoad(){
			if(iframe.attachEvent){
				iframe.attachEvent("onload",toggleMask);
			}else{
				iframe.onload=function(){toggleMask(true);}
			}
		}
		bindFrameLoad();

		function toggleMask(showing){
			var className = frameWrap.className;
			if(showing){
				frameWrap.className = className.replace(/\s+loading/g,"");
			}else{
				frameWrap.className+=" loading";
			}
		}
		function toggleSidebar(){
			var className = sidebar.className;
			if(/hidden/.test(className)){
				sidebar.className=className.replace(/\s+hidden/,"");
			}else sidebar.className = className+" hidden";
		}

		function loadDoc(target){
			timer&&clearTimeout(timer);
			timer = setTimeout(function(){
				toggleMask();
				var pNode=target.parentNode,
					className = pNode.className;
				setTimeout(function(){iframe.src=target.getAttribute("data-href");},0);
				currentItem&&(currentItem.parentNode.className=currentItem.parentNode.className.replace("active",""));
				pNode.className = className+" active";
				currentItem = target;
			},200);
		}
		
	}