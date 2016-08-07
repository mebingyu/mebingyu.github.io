//滚轮事件

function addEvent(obj, sEv, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(sEv, fn, false);
	} else {
		obj.attachEvent('on' + sEv, fn);
	}
}

function addWheel(obj, fn) {
	function wheel(ev) {
		var oEvent = ev || event;

		var bDown = true;
		if (oEvent.wheelDelta) {
			if (oEvent.wheelDelta > 0) {
				bDown = false;
			} else {
				bDown = true;
			}
		} else {
			if (oEvent.detail < 0) {
				bDown = false;
			} else {
				bDown = true;
			}
		}

		fn && fn(bDown);
		// 阻止默认事件
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}

	if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
		obj.addEventListener('DOMMouseScroll', wheel, false);
	} else {
		// obj.onmousewheel=wheel;
		addEvent(obj, 'mousewheel', wheel);
	}
}

//弹性运动
(function(window) {
	var top = 0;
	var iSpeed = 0;
	var timer = null;
	window.elastic = function(obj, iTarget) {
		clearInterval(timer);
		timer = setInterval(function() {
			iSpeed += (iTarget - top) / 5;
			iSpeed *= 0.8;
			top += iSpeed;
			obj.style.top = top + 'px';
			if (Math.abs(iSpeed) < 1 && Math.round(top) == iTarget) {
				clearInterval(timer);
			}
		}, 30);
	}
})(window);

//getStyle

function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, false)[name];
	}
}

//运动终极

function move(obj, json, options) {
	//默认值
	var options = options || {};
	options.duration = options.duration || 500;
	options.easing = options.easing || 'linear';

	var start = {};
	var dis = {};
	for (var name in json) {
		start[name] = parseFloat(getStyle(obj, name));
		dis[name] = json[name] - start[name];
	}

	var count = Math.floor(options.duration / 30);
	var n = 0;
	clearInterval(obj.timer)
	obj.timer = setInterval(function() {
		n++;
		for (var name in json) {
			switch (options.easing) {
				case 'linear':
					var a = n / count;
					var cur = start[name] + dis[name] * a;
					break;
				case 'ease-in':
					var a = n / count;
					var cur = start[name] + dis[name] * a * a * a;
					break;
				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - a * a * a);
					break;
			}
			if (name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity=' + cur * 100 + ')';
			} else {
				obj.style[name] = cur + 'px';
			}

		}
		if (n == count) {
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	}, 30)
}

// 拖拽

function drag(obj) {
	obj.onmousedown = function(ev) {
		obj.style.zIndex = zIndex++;
		var oEvent = ev || event;
		var disX = oEvent.clientX - obj.offsetLeft;
		var disY = oEvent.clientY - obj.offsetTop;

		document.onmousemove = function(ev) {
			var oEvent = ev || event;

			obj.style.left = oEvent.clientX - disX + 'px';
			obj.style.top = oEvent.clientY - disY + 'px';

		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
}

// 碰撞检测

function collTest(obj, obj2) {
	var l1 = obj.offsetLeft;
	var r1 = obj.offsetWidth + l1;
	var t1 = obj.offsetTop;
	var b1 = obj.offsetHeight + t1;

	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetWidth + l2;
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetHeight + t2;
	if (r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
		return false;
	} else {
		return true;
	}
}



window.onload = function() {

	//上下换页 
	var oBody = document.body;
	var bFlag = true;
	var oBox = document.getElementById('box');
	//header效果
	var oHeader = document.getElementById('header');
	var timer = null;
	//logo效果
	var oLogo = document.getElementById('logo');
	var oImg = oLogo.getElementsByTagName('img')[0];
	var n = 0;
	//导航鼠标hover效果
	var oNav = document.getElementById('nav');
	var aLi = oNav.children;
	var aSpan = oNav.getElementsByTagName('span');
	//center效果
	var oCenter = document.getElementById('center');
	//footer效果
	var oImgBox = document.getElementById('imgBox');
	var aLiImg = oImgBox.children;
	var aImg = oImgBox.getElementsByTagName('img');
	var aA = oImgBox.getElementsByTagName('a');
	var oImgBox = document.getElementById('imgBox');
	// 存坐标
	var aPos = [];
	//导航效果
	var oResume = document.getElementById('resume');
	var clientH = document.documentElement.clientHeight;
	var oResumeTop = 700;
	//circleTitle
	var oCircleTitle = document.getElementById('circleTitle');
	var aCli = oCircleTitle.getElementsByTagName('li');
	//resume
	var oR = document.getElementById('r');
	var oRc = document.getElementById('rcontent');
	var aR = oRc.getElementsByTagName('div');
	var obj = null;
	var open = null;
	//skill
	var oS = document.getElementById('s');
	var oSkill = document.getElementById('S');
	//experence
	var oE = document.getElementById('e');
	//project
	var oP = document.getElementById('p');
	//projects效果
	var oPro = document.getElementById('P');
	var aProLi = oPro.getElementsByTagName('li');
	var aProSpan = oPro.getElementsByTagName('span');
	//二排一列
	var aProImg = oPro.getElementsByTagName('img');
	//旋转盒子
	var oTbox = document.getElementById('tBox');
	//上下换页 

	function pageDown() {
		move(oBox, {
			top: -650
		}, {
			duration: 700,
			easing: 'linear'
		}, move(oResume, {
			top: 0
		}, {
			duration: 700,
			easing: 'linear'
		}));
		oResume.style.display = 'block';
	}

	function pageUp() {
		move(oResume, {
			top: oResumeTop
		}, {
			duration: 700,
			easing: 'linear'
		}, move(oBox, {
			top: 0
		}, {
			duration: 700,
			easing: 'linear',
			complete: function() {
				oResume.style.display = 'none';
			}
		}));
	}

	//header效果
	timer = setTimeout(function() {
		move(oHeader, {
			opacity: 1
		}, {
			duration: 2000,
			easing: 'linear'
		});
		clearTimeout(timer);
	}, 1500);

	//logo效果 + 旋转盒子
	setInterval(function() {
		n++;
		if (n == 360) {
			n = 0;
		}
		oImg.style.transform = 'rotateX(' + n + 'deg)';
		oTbox.style.transform = 'perspective(1200px) rotateX(' + n + 'deg) rotateY(1deg)';
	}, 30);

	//导航鼠标hover效果
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onmouseover = function() {
			move(aSpan[this.index], {
				top: 50
			}, {
				duration: 300,
				easing: 'ease-out'
			});
			move(this, {
				fontSize: 30
			}, {
				duration: 200,
				easing: 'linear'
			});
		}
		aLi[i].onmouseout = function() {
			move(aSpan[this.index], {
				top: -95
			}, {
				duration: 500,
				easing: 'ease-in'
			});
			move(this, {
				fontSize: 35
			}, {
				duration: 500,
				easing: 'linear'
			});
		}
	}

	//center效果
	timer = setTimeout(function() {
		move(oCenter, {
			opacity: 1
		}, {
			duration: 2000,
			easeing: 'linear'
		});
		clearTimeout(timer);
	}, 500);

	//下拉效果
	setTimeout(function() {
		move(oImgBox, {
			height: 200
		}, {
			duration: 1000,
			easing: 'linear'
		});
	}, 2000);

	// 加事件
	aA[2].onclick = aA[0].onclick = aA[1].onclick = function() {
		toRight();
		return false;
	};
	aA[3].onclick = aA[4].onclick = function() {
		toLeft();
		return false;
	};
	// 存坐标
	for (var i = 0; i < aLiImg.length; i++) {
		aPos[i] = {
			left: aLiImg[i].offsetLeft,
			top: aLiImg[i].offsetTop,
			width: aImg[i].offsetWidth,
			height: aImg[i].offsetHeight,
			opacity: getStyle(aImg[i], 'opacity'),
			oImgTop: aImg[i].offsetTop,
			fnClick: aA[i].onclick
		}
	}

	function toLeft() {
		// 删除最后一项，添加到第一项
		aPos.unshift(aPos.pop());
		changePos();
	}

	function toRight() {
		aPos.push(aPos.shift());
		changePos();
	}

	function changePos() {
		for (var i = 0; i < aLiImg.length; i++) {
			move(aLiImg[i], {
				left: aPos[i].left,
				top: aPos[i].top
			});
			move(aImg[i], {
				width: aPos[i].width,
				height: aPos[i].height,
				opacity: aPos[i].opacity,
				top: aPos[i].oImgTop
			});
			aA[i].onclick = aPos[i].fnClick;
		}
	}

	//鼠标滚轮事件
	addWheel(document, function(bDown) {
		if (bDown) {
			pageDown();
		} else {
			pageUp();
		}
	});

	//circleTitle
	for (var i = 0; i < aCli.length; i++) {
		aCli[i].index = i;
		aCli[i].onmouseover = function() {
			elastic(aCli[0], this.offsetTop);
		}
	}

	//resume
	aCli[1].onclick = function() {
		allMove(oR, 0);
	}

	//skill
	aCli[2].onclick = function() {
		allMove(oS, 1);
	}
	//experence
	aCli[3].onclick = function() {
		allMove(oE, 2);
	}
	//project
	aCli[4].onclick = function() {
		allMove(oP, 3);
	}

	// 导航点击 下页展开
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onclick = function() {
			pageDown();
			switch (this.index) {
				case 0:
					allMove(oR, 0);
					break;
				case 1:
					allMove(oS, 1);
					break;
				case 2:
					allMove(oE, 2);
					break;
				case 3:
					allMove(oP, 3);
					break;
			}
		}
	}

	//放大

	function enlarge(obj) {
		var abj = obj.children;
		move(obj, {
			left: 148,
			top: 150
		}, {
			duration: 200,
			complete: function() {
				move(oRc, {
					width: 1120,
					height: 450
				}, {
					duration: 700
				});
				move(abj[1], {
					left: 1103,
					top: 0
				}, {
					duration: 700
				});
				move(abj[2], {
					left: 0,
					top: 430
				}, {
					duration: 700
				});
				move(abj[3], {
					left: 1103,
					top: 430
				}, {
					duration: 700
				});
			}
		});
	}
	//缩小

	function narrow(obj, pos) {
		var abj = obj.children;
		move(abj[1], {
			left: 64,
			top: 0
		}, {
			duration: 200
		});
		move(abj[2], {
			left: 0,
			top: 64
		}, {
			duration: 200
		});
		move(abj[3], {
			left: 64,
			top: 64
		}, {
			duration: 200
		});
		move(oRc, {
			width: 0,
			height: 0
		}, {
			duration: 200,
			complete: function() {
				move(obj, {
					left: 0,
					top: pos
				}, {
					duration: 100
				});
			}
		});
	}
	//判断缩小的是哪个

	function narrowWitch(obj) {
		switch (obj) {
			case oR:
				narrow(oR, 150);
				break;
			case oS:
				narrow(oS, 278);
				break;
			case oE:
				narrow(oE, 406);
				break;
			case oP:
				narrow(oP, 534);
				break;
				break;
		}
	}
	//关闭当前展示页面

	function close() {
		for (var i = 0; i < aR.length; i++) {
			aR[i].style.display = 'none';
		}
	}
	//封装整个按钮运动效果

	function allMove(which, num) {
		close();
		if (bFlag) {
			bFlag = false;
			narrowWitch(obj);
			setTimeout(function() {
				enlarge(which);
				bFlag = true;
				aR[num].style.display = 'block';
			}, 200);
			obj = which;
		}
	}
	//projects效果
	aProLi[0].onmouseover = function() {
		aProSpan[0].style.display = 'block';
		move(aProSpan[0], {
			opacity: 1,
			left: 13,
			top: 13
		}, {
			duration: 200
		});
	}
	aProLi[0].onmouseout = function() {
		move(aProSpan[0], {
			opacity: 0,
			left: 0,
			top: 0
		}, {
			duration: 200
		});
	}
	//一排二列
	aProSpan[1].style.display = 'block';
	aProLi[1].onmouseover = function() {
		move(aProSpan[1], {
			top: -35
		}, {
			duration: 200
		});
	}
	aProLi[1].onmouseout = function() {
		move(aProSpan[1], {
			top: 0
		}, {
			duration: 200
		});
	}
	//一排三列
	aProLi[2].onmouseover = function() {
		move(aProSpan[3], {
			width: 120,
			height: 80,
			marginLeft: -60,
			marginTop: -40
		}, {
			duration: 250
		});
		move(aProSpan[2], {
			opacity: 1,
			width: 300,
			height: 200,
			marginLeft: -150,
			marginTop: -100
		}, {
			duration: 250
		});
	}
	aProLi[2].onmouseout = function() {
		move(aProSpan[3], {
			width: 300,
			height: 200,
			marginLeft: -150,
			marginTop: -100
		}, {
			duration: 250
		});
		move(aProSpan[2], {
			opacity: 0,
			width: 120,
			height: 80,
			marginLeft: -60,
			marginTop: -40
		}, {
			duration: 250
		});
	}
	//二排一列
	aProLi[3].onmouseover = function() {
		move(aProSpan[4], {
			width: 150
		}, {
			duration: 250
		});
		move(aProImg[0], {
			width: 150
		}, {
			duration: 250
		});
	}
	aProLi[3].onmouseout = function() {
		move(aProSpan[4], {
			width: 0
		}, {
			duration: 250
		});
		move(aProImg[0], {
			width: 300
		}, {
			duration: 250
		});
	}
	//二排二列
	aProLi[4].onmouseover = function() {
		move(aProSpan[6], {
			width: 120,
			height: 80,
			marginLeft: -60,
			marginTop: -70
		}, {
			duration: 250
		});
	}
	aProLi[4].onmouseout = function() {
		move(aProSpan[6], {
			width: 300,
			height: 200,
			marginLeft: -150,
			marginTop: -100
		}, {
			duration: 250
		});
	}
	//二排三列
	aProLi[5].onmouseover = function() {
		move(aProImg[1], {
			width: 0,
			height: 200,
		}, {
			duration: 250
		});
		move(aProImg[2], {
			width: 0,
			height: 200,
		}, {
			duration: 250
		});
	}
	aProLi[5].onmouseout = function() {
		move(aProImg[1], {
			width: 150,
			height: 200
		}, {
			duration: 150
		});
		move(aProImg[2], {
			width: 150,
			height: 200
		}, {
			duration: 150
		});
	}
}