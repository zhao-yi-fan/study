function my$(id){
	return document.getElementById(id);
}

//设置任意元素的中间的文本内容
function setInnerText(element,text) {
    if(typeof element.textContent=="undefined"){
        element.innerText=text;
    }else{
        element.textContent=text;
    }
}
//获取任意元素的中间的文本内容
function getInnerText(element) {
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else{
        return element.textContent;
    }
}

function getFirstElementChild(element){

	if(element.firstElementChild){
		return element.firstElementChild;
	}else{
		var node = element.firstChild;
		while(node && node.nextSibling != 1){
			node = node.nextSibling;
		}
		return node;
	}
}

function getLastElementChild(element){
	if(element.lastElementChild){
		return element.lastElementChild;
	}else{
		var node = element.lastChild;
		while(node && node.previousSibling != 1){
			node = node.previousSibling;
		}
		return node;
	}
}

//绑定事件的兼容代码
function addEventListener(element,type,fn){
	if(element.addEventListener){
		element.addEventListener(type,fn,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,fn);
	}else{
		element["on"+type]=null;
	}
};
//解除绑定事件的兼容代码
function removeEventListener(element,type,fnName){
	if(element.removeEventListener){
		element.removeEventListener(type,fnName);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,fnName);
	}else{
		element["on"+type]=null;
	}
}
