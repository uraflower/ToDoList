/* TO DO todo */
/*
 * 할 일을 추가하고, 수정하고, 삭제하는 기능
 * 할 일마다 색을 다르게 할 수 있는 기능
 */

const STARCODE = "&#9733;";
const todolist = document.getElementById("todolist");
let starRating = document.getElementById("starRating");
let stars = starRating.childNodes;

function Todo(title, content, priority) {
	//this.id = getTime();
	this.title = title;
	this.content = content;
	this.priority = priority;
}

/* todo 추가하기 */
const appendList = () => {
	const title = document.getElementById("inputTitle").value;
	const content = document.getElementById("inputContent").value;
	let priority = "";
	stars.forEach((star) => {
		if (star.checked) {
			for (let i = 0; i < star.value; i++) priority += STARCODE;
		}
	});

	if (!title || !content) {
		alert("할 일의 제목과 내용을 입력해주세요");
		return false;
	}
	let todoitem = new Todo(title, content, priority);

	let list = document.createElement("li");
	list.className = "todo";
	list.innerHTML = `
					<div class="cover">
						<strong>${todoitem.title}</strong>
						<p>${todoitem.content}</p>
					</div>
					<span class="priority">${todoitem.priority}</span>
					<button class="doneBtn" onClick="finishList()">✔</button>
					<button class="deleteBtn" onClick="deleteList()">✖</button>
	`;

	todolist.append(list);
	clearInputBox();
};

/* 완료한 리스트 처리 */
finishList = () => {
	let todo = event.target.parentElement;
	let cover;

	for (let i = 0; i < todo.childNodes.length; i++) {
		if (todo.childNodes[i].nodeName === "#text") continue;
		if (todo.childNodes[i].classList.contains("cover")) {
			cover = todo.childNodes[i];
			break;
		}
	}

	todo.classList.toggle("finished-todo");
	cover.classList.toggle("finished-cover");
};

/* todo 삭제 */
deleteList = () => {
	event.target.parentElement.remove();
	return false;
};

/* todo 전체 삭제 */

/* todo 수정하기 */

/* 중요도 순으로 입력할 수 있는 창 또는 라디오 버튼을 넣어서 중요도 지정 가능하게 */
starRating.addEventListener("click", function (e) {
	clearStarRating();
	e.target.previousElementSibling.setAttribute("checked", "true"); //e.target : label
});

/* inputBox clear 함수 */
clearInputBox = () => {
	clearInputText();
	clearStarRating();
};

/* title, content 입력 박스 clear */
clearInputText = () => {
	document.getElementById("inputTitle").value = "";
	document.getElementById("inputContent").value = "";
};

/* 중요도 clear */
clearStarRating = () => {
	stars.forEach((star) => {
		if (star.checked) star.removeAttribute("checked");
	});
};

/* 날짜와 시간 표시하기 */
getTime = () => {
	let date = new Date();
	let time =
		date.getFullYear() +
		"-" +
		(date.getMonth() + 1) +
		"-" +
		date.getDate() +
		" " +
		date.getHours() +
		":" +
		date.getMinutes() +
		":" +
		date.getSeconds();
	return time;
};
