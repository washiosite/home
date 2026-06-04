const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const notesList = document.getElementById("notesList");

function loadNotes() {

const notes =
JSON.parse(localStorage.getItem("washio_notes"))
|| [];

notesList.innerHTML = "";

notes.reverse().forEach((note,index)=>{

const card =
document.createElement("div");

card.className = "glass note-card";

card.innerHTML = `

<h3>${note.date}</h3>
<p>${note.text}</p>
<button onclick="deleteNote(${notes.length-1-index})">
削除
</button>
`;

notesList.appendChild(card);

});

}

saveBtn.addEventListener("click",()=>{

const text =
noteInput.value.trim();

if(!text) return;

const notes =
JSON.parse(localStorage.getItem("washio_notes"))
|| [];

notes.push({

text:text,

date:new Date().toLocaleString("ja-JP")

});

localStorage.setItem(
"washio_notes",
JSON.stringify(notes)
);

noteInput.value="";

loadNotes();

});

function deleteNote(index){

const notes =
JSON.parse(localStorage.getItem("washio_notes"))
|| [];

notes.splice(index,1);

localStorage.setItem(
"washio_notes",
JSON.stringify(notes)
);

loadNotes();

}

loadNotes();
