
setTimeout(()=>boot.style.display='none',1500);
function tick(){time.textContent=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}
tick();setInterval(tick,1000);

let sy=0;
lockscreen.addEventListener('touchstart',e=>sy=e.touches[0].clientY);
lockscreen.addEventListener('touchend',e=>{if(sy-e.changedTouches[0].clientY>40) pinScreen.style.display='flex';});

for(let i=1;i<=9;i++) pad.innerHTML+=`<button onclick="pinAdd('${i}')">${i}</button>`;
pad.innerHTML+='<div></div><button onclick="pinAdd(\'0\')">0</button><button onclick="delPin()">⌫</button>';

let pin='';
function render(){dots.textContent=[0,1,2,3].map(i=>i<pin.length?'●':'○').join(' ')}
function pinAdd(n){pin+=n;render();if(pin.length===4){if(pin==='0000'){lockscreen.style.display='none';pinScreen.style.display='none';home.style.display='block'}else{alert('PIN salah');pin='';render();}}}
function delPin(){pin=pin.slice(0,-1);render()}

const apps=[
['🌐','Safari'],['📝','Notes'],['🧮','Calculator'],['⚙️','Settings'],
['🎵','Music'],['📷','Camera'],['💬','Messages'],['📁','Files']
];

icons.innerHTML=apps.map(a=>`<div class="icon" data-app="${a[1]}" style="background:rgba(255,255,255,.15)">${a[0]}</div>`).join('');

document.querySelectorAll('.icon').forEach(el=>{
 el.ondblclick=()=>openApp(el.dataset.app);
});

function openApp(name){
 app.style.display='block';
 appTitle.textContent=name;

 if(name==='Notes'){
   appContent.innerHTML='<textarea id="n" rows="15"></textarea><button onclick="saveNote()">Simpan</button>';
   n.value=localStorage.getItem('note')||'';
 } else if(name==='Calculator'){
   appContent.innerHTML='<input id="c"><button onclick="calc()">Hitung</button><div id="r"></div>';
 } else if(name==='Safari'){
   appContent.innerHTML='<p>Browser simulasi. Untuk GitHub Pages, ganti dengan iframe atau fetch API.</p>';
 } else {
   appContent.innerHTML='<h3>'+name+'</h3><p>Modul simulasi.</p>';
 }
}

function closeApp(){app.style.display='none'}
function saveNote(){localStorage.setItem('note',n.value)}
function calc(){r.textContent=Function('return '+c.value)()}
