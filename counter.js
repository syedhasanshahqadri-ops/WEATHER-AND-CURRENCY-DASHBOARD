/* ---------- Counter: wazaif, durood, kalma and zikr ---------- */
(()=>{
const CATS=[
  {id:'durood',name:'Durood'},
  {id:'kalma',name:'Kalma'},
  {id:'zikr',name:'Zikr'},
  {id:'free',name:'Free'}
];

/* c = category, n = full name, s = short chip label, a = Arabic text */
const W=[
  {id:'d1',c:'durood',n:'Durood Shareef 1',s:'Durood 1',a:'صَلَّی اللّٰہُ عَلٰی النَّبِیِّ الْاُمِّیِّ وَاٰلِہٖ صَلَّی اللّٰہُ عَلَیْہِ وَسَلَّمَ صَلٰوۃً وَّسَلَامًا عَلَیْکَ یَا رَسُوْلَ اللّٰہِ'},
  {id:'d2',c:'durood',n:'Durood Shareef 2',s:'Durood 2',a:'اَللّٰهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلٰى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ الْحَبِيْبِ الْعَالِي الْقَدْرِ الْعَظِيْمِ الْجَاهِ وَعَلٰى آلِهٖ وَصَحْبِهٖ وَسَلِّم'},
  {id:'d3',c:'durood',n:'Durood Ibrahim',s:'Ibrahim',a:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.'},
  {id:'d4',c:'durood',n:'Sallallahu Alayhi Wasallam',s:'Salawat',a:'صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ'},

  {id:'k1',c:'kalma',n:'Kalma 1 (Tayyab)',s:'Kalma 1',a:'لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ'},
  {id:'k2',c:'kalma',n:'Kalma 2 (Shahadat)',s:'Kalma 2',a:'أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ'},
  {id:'k3',c:'kalma',n:'Kalma 3 (Tamjeed)',s:'Kalma 3',a:'سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ وَلَا اِلٰهَ اِلَّا اللهُ وَاللهُ اَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللهِ الْعَلِيِّ الْعَظِيْمِ'},
  {id:'k4',c:'kalma',n:'Kalma 4 (Tawheed)',s:'Kalma 4',a:'لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا ذُو الْجَلَالِ وَالْإِكْرَامِ بِيَدِهِ الْخَيْرُ وَهُوَ عَلٰى كُلِّ شَيْءٍ قَدِيرٌ'},
  {id:'k5',c:'kalma',n:'Kalma 5 (Astaghfar)',s:'Kalma 5',a:'أَسْتَغْفِرُ اللهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ'},
  {id:'k6',c:'kalma',n:'Kalma 6 (Radd-e-Kufr)',s:'Kalma 6',a:'اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا وَأَسْلَمْتُ وَأَقُولُ لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ'},

  {id:'z1',c:'zikr',n:'Tasbih and Istighfar',s:'Tasbih',a:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ، أَسْتَغْفِرُ اللَّهَ'},
  {id:'z2',c:'zikr',n:'Istighfar',s:'Istighfar',a:'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ'},
  {id:'z3',c:'zikr',n:'SubhanAllah',s:'SubhanAllah',a:'سُبْحَانَ اللّٰهِ'},
  {id:'z4',c:'zikr',n:'Alhamdulillah',s:'Alhamdulillah',a:'اَلْحَمْدُ لِلّٰهِ'},
  {id:'z5',c:'zikr',n:'Allahu Akbar',s:'Allahu Akbar',a:'اَللّٰهُ أَكْبَرُ'},
  {id:'z6',c:'zikr',n:'La ilaha illallah',s:'La ilaha',a:'لَا إِلٰهَ إِلَّا اللّٰهُ'},
  {id:'z7',c:'zikr',n:'Astaghfirullah',s:'Astaghfirullah',a:'أَسْتَغْفِرُ اللّٰهَ'},
  {id:'z8',c:'zikr',n:'La hawla wa la quwwata',s:'La hawla',a:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ'},
  {id:'z9',c:'zikr',n:'Hasbunallah',s:'Hasbunallah',a:'حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيلُ'},

  {id:'f1',c:'free',n:'Free counter',s:'Free counter',a:''}
];

const TARGETS=[11,33,41,100,313,500,1000];
const SIZES=[1.4,1.7,2,2.4,2.9];
const DEF_SET={vib:true,snd:false,wake:false,txt:true,sz:2};

let cur=store.get('ccur','d1');
if(!W.some(w=>w.id===cur))cur='d1';
let counts=store.get('cnt',{}),targets=store.get('ctg',{});
let cfg=Object.assign({},DEF_SET,store.get('cset',{}));
let day=store.get('cday',{d:'',n:0});

const item=()=>W.find(w=>w.id===cur);
const total=()=>Math.max(0,counts[cur]|0);
const target=()=>Math.max(1,targets[cur]|0||33);
const dkey=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const today=()=>day.d===dkey()?day.n:0;
const saveCfg=()=>store.set('cset',cfg);

/* ----- feedback: vibration and a soft click ----- */
let actx=null;
function tone(f,dur,delay){
  try{
    actx=actx||new(window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended')actx.resume();
    const t=actx.currentTime+(delay||0),o=actx.createOscillator(),g=actx.createGain();
    o.type='sine';o.frequency.value=f;
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.2,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(actx.destination);o.start(t);o.stop(t+dur+.03);
  }catch(e){}
}
const buzz=p=>{if(cfg.vib&&navigator.vibrate)try{navigator.vibrate(p)}catch(e){}};

/* ----- screen wake lock ----- */
let wl=null;
const inView=()=>location.hash.slice(1)==='counter';
async function wake(){
  if(!cfg.wake||!('wakeLock' in navigator)||document.hidden||!inView()||wl)return;
  try{wl=await navigator.wakeLock.request('screen');wl.addEventListener('release',()=>{wl=null})}catch(e){wl=null}
}
function unwake(){if(wl){try{wl.release()}catch(e){}wl=null}}
addEventListener('hashchange',()=>{inView()?wake():unwake()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)wake()});

/* ----- drawing ----- */
function drawCats(){
  const box=$('#kcat');box.textContent='';
  const c=item().c;
  CATS.forEach(k=>{
    const b=document.createElement('button');b.type='button';b.textContent=k.name;b.dataset.c=k.id;
    b.className=k.id===c?'on':'';b.setAttribute('aria-pressed',k.id===c);
    box.appendChild(b);
  });
}
function drawItems(){
  const box=$('#kitems'),c=item().c,list=W.filter(w=>w.c===c);
  box.textContent='';
  box.hidden=list.length<2;
  list.forEach(w=>{
    const b=document.createElement('button');b.type='button';b.className='chip'+(w.id===cur?' on':'');
    b.textContent=w.s;b.dataset.id=w.id;b.setAttribute('aria-pressed',w.id===cur);
    box.appendChild(b);
  });
  const on=box.querySelector('.on');
  if(on&&on.scrollIntoView)try{box.scrollTo({left:Math.max(0,on.offsetLeft-box.clientWidth/2+on.offsetWidth/2)})}catch(e){}
}
function drawText(){
  const w=item(),i=W.indexOf(w)+1;
  $('#kname').textContent=w.n;
  $('#kpos').textContent=i+' of '+W.length;
  const tx=$('#ktext'),ar=$('#kar');
  ar.textContent=w.a;
  tx.style.setProperty('--az',SIZES[cfg.sz]+'rem');
  tx.hidden=!cfg.txt||!w.a;
  tx.scrollTop=0;
}
function drawCount(pulse){
  const t=total(),g=target(),r=Math.floor(t/g),m=t%g;
  const shown=t===0?0:(m===0?g:m);
  $('#kn').textContent=shown.toLocaleString('en-US');
  $('#kof').textContent='of '+g.toLocaleString('en-US');
  const pg=$('#kpg'),p=shown/g;
  pg.style.strokeDashoffset=String(100-p*100);
  pg.style.opacity=shown===0?'0':'1';
  $('#kround').textContent=r.toLocaleString('en-US');
  $('#ktot').textContent=t.toLocaleString('en-US');
  $('#kday').textContent=today().toLocaleString('en-US');
  $('#ktap').setAttribute('aria-label','Add one. Count is '+shown+' of '+g);
  $('#kundo').disabled=t===0;
  $('#kreset').disabled=t===0;
  if(pulse){const k=$('#kring');k.classList.remove('done');void k.offsetWidth;k.classList.add('done')}
}
function drawTargets(){
  const box=$('#ktg'),g=target();
  box.textContent='';
  TARGETS.forEach(n=>{
    const b=document.createElement('button');b.type='button';b.className='chip'+(n===g?' on':'');
    b.textContent=n;b.dataset.n=n;b.setAttribute('aria-pressed',n===g);
    box.appendChild(b);
  });
  $('#kcu').value=TARGETS.includes(g)?'':g;
}
function drawSettings(){
  $('#kvib').checked=cfg.vib;
  $('#ksnd').checked=cfg.snd;
  $('#ktxt').checked=cfg.txt;
  const can='wakeLock' in navigator;
  $('#kwake').checked=can&&cfg.wake;$('#kwake').disabled=!can;
  $('#kwakes').textContent=can?'Stops the screen from turning off while you count.':'Not supported on this browser.';
  $('#kszm').disabled=cfg.sz<=0;$('#kszp').disabled=cfg.sz>=SIZES.length-1;
}
function drawAll(){drawCats();drawItems();drawText();drawTargets();drawCount();drawSettings()}

/* ----- actions ----- */
function pick(id){
  if(!W.some(w=>w.id===id)||id===cur)return;
  cur=id;store.set('ccur',cur);drawAll();
}
function add(){
  const g=target();
  counts[cur]=total()+1;store.set('cnt',counts);
  const k=dkey();day={d:k,n:(day.d===k?day.n:0)+1};store.set('cday',day);
  const doneRound=counts[cur]%g===0;
  drawCount(doneRound);
  if(doneRound){
    buzz([180,90,180]);
    if(cfg.snd){tone(660,.18);tone(880,.28,.16)}
    toast('Round '+(counts[cur]/g)+' complete');
  }else{
    buzz(12);
    if(cfg.snd)tone(900,.05);
  }
}
function undo(){
  if(total()===0)return;
  counts[cur]=total()-1;store.set('cnt',counts);
  if(day.d===dkey()&&day.n>0){day.n--;store.set('cday',day)}
  buzz(8);drawCount();
}
function reset(){
  if(total()===0)return;
  if(!confirm('Reset the count for '+item().n+' to zero?'))return;
  counts[cur]=0;store.set('cnt',counts);drawCount();toast('Count reset');
}
function setTarget(n){
  n=Math.round(Number(n));
  if(!isFinite(n)||n<1||n>100000){toast('Enter a target from 1 to 100000');drawTargets();return}
  targets[cur]=n;store.set('ctg',targets);drawTargets();drawCount();
}
function step(d){
  const l=W.filter(w=>w.c===item().c),i=l.indexOf(item()),all=W.indexOf(item());
  if(l.length>1){pick(l[(i+d+l.length)%l.length].id)}
  else pick(W[(all+d+W.length)%W.length].id);
}

/* ----- events ----- */
$('#ktap').onclick=add;
$('#kundo').onclick=undo;
$('#kreset').onclick=reset;
$('#kprev').onclick=()=>step(-1);
$('#knext').onclick=()=>step(1);
$('#kcat').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const first=W.find(w=>w.c===b.dataset.c);if(first)pick(first.id);
});
$('#kitems').addEventListener('click',e=>{const b=e.target.closest('button');if(b)pick(b.dataset.id)});
$('#ktg').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setTarget(b.dataset.n)});
$('#kcus').onclick=()=>setTarget($('#kcu').value);
$('#kcu').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();setTarget($('#kcu').value)}});
$('#kvib').onchange=e=>{cfg.vib=e.target.checked;saveCfg();if(cfg.vib)buzz(20)};
$('#ksnd').onchange=e=>{cfg.snd=e.target.checked;saveCfg();if(cfg.snd)tone(900,.05)};
$('#ktxt').onchange=e=>{cfg.txt=e.target.checked;saveCfg();drawText()};
$('#kwake').onchange=e=>{cfg.wake=e.target.checked;saveCfg();cfg.wake?wake():unwake()};
$('#kszm').onclick=()=>{if(cfg.sz>0){cfg.sz--;saveCfg();drawText();drawSettings()}};
$('#kszp').onclick=()=>{if(cfg.sz<SIZES.length-1){cfg.sz++;saveCfg();drawText();drawSettings()}};
$('#kclear').onclick=()=>{
  if(!confirm('Clear the counts for every wazifa on this device?'))return;
  counts={};day={d:'',n:0};store.set('cnt',counts);store.set('cday',day);drawCount();toast('All counts cleared');
};

/* Space, Enter or Arrow Up counts when nothing else is focused. Arrow Down undoes. */
document.addEventListener('keydown',e=>{
  if(!inView()||e.target!==document.body||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key===' '||e.key==='Enter'||e.key==='ArrowUp'){e.preventDefault();add()}
  else if(e.key==='ArrowDown'){e.preventDefault();undo()}
});

drawAll();
if(inView())wake();
})();
