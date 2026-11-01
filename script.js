const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get:(k,d)=>{try{const v=localStorage.getItem('sr-'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem('sr-'+k,JSON.stringify(v))}catch(e){}}};
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2600)};

/* ---------- Theme ---------- */
const R0=document.documentElement;
const isDark=()=>(R0.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
const paintTheme=()=>{const d=isDark();$('#theme').textContent=d?'☀':'☾';$('#theme').setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme');$('#tc').content=d?'#080D18':'#F1F4FA'};
const th=store.get('theme',null);if(th)R0.dataset.theme=th;
paintTheme();
$('#theme').onclick=()=>{const t=isDark()?'light':'dark';R0.dataset.theme=t;store.set('theme',t);paintTheme()};
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',paintTheme);

/* ---------- Views: Weather and Currency are separate screens ---------- */
const VIEWS=['weather','currency'];
function route(){
  const v=VIEWS.includes(location.hash.slice(1))?location.hash.slice(1):'weather';
  VIEWS.forEach(x=>{$('#v-'+x).hidden=x!==v});
  document.body.dataset.v=v;
  $$('[data-t]').forEach(a=>{const on=a.dataset.t===v;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
  document.title=(v==='weather'?'Weather':'Currency')+' | SkyRate';
  scrollTo(0,0);
}
addEventListener('hashchange',route);route();

/* ---------- Install as an app ---------- */
let dp=null;
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const ios=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const syncInstall=()=>{const s=standalone();$('#install').hidden=s;$('#ban').hidden=s||store.get('bandis',false)};
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;syncInstall()});
addEventListener('appinstalled',()=>{dp=null;syncInstall();toast('SkyRate was installed')});
async function install(){
  if(dp){dp.prompt();const c=await dp.userChoice;dp=null;if(c.outcome==='accepted')toast('Installing SkyRate…');return}
  let h;
  if(location.protocol==='file:')h='<p>An app can only be installed from a website address. Upload this folder to GitHub Pages (or any https host), open the link, and press <b>Install app</b> again.</p>';
  else if(ios())h='<ol><li>Tap the <b>Share</b> button in Safari.</li><li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol>';
  else h='<ol><li>Open this page in <b>Chrome</b> or <b>Edge</b>.</li><li>Click the install icon in the address bar, or open the browser menu and choose <b>Install SkyRate</b> or <b>Add to Home screen</b>.</li></ol><p style="margin-top:12px">If you do not see it, check that the page is opened over https.</p>';
  $('#insb').innerHTML=h;$('#ins').showModal();
}
$('#install').onclick=install;$('#bi').onclick=install;
$('#bx').onclick=()=>{store.set('bandis',true);syncInstall()};
$('#insx').onclick=()=>$('#ins').close();
matchMedia('(display-mode: standalone)').addEventListener?.('change',syncInstall);
syncInstall();
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

/* ---------- Weather helpers ---------- */
const LBL={0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',56:'Freezing drizzle',57:'Freezing drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Freezing rain',71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Rain showers',81:'Rain showers',82:'Violent showers',85:'Snow showers',86:'Snow showers',95:'Thunderstorm',96:'Thunderstorm with hail',99:'Thunderstorm with hail'};
const kind=c=>c<2?'clear':c==2?'pc':c==3?'cloud':c<50?'fog':c<70?'rain':c<80?'snow':c<85?'rain':c<90?'snow':'storm';
const CL='<path d="M20 44h26a9 9 0 0 0 1-18 13 13 0 0 0-25-2 10 10 0 0 0-2 20z" fill="url(#cg)" stroke="#8FA0BA" stroke-width="1.2"/>';
const MOON='<path d="M38 12a19 19 0 1 0 14 30A16 16 0 0 1 38 12z" fill="#DCE3F7"/>';
const SUN=(x,y,r)=>`<g class="rays" style="transform-origin:${x}px ${y}px">${[0,45,90,135,180,225,270,315].map(a=>`<line x1="${x}" y1="${y-r-4}" x2="${x}" y2="${y-r-9}" transform="rotate(${a} ${x} ${y})"/>`).join('')}</g><circle cx="${x}" cy="${y}" r="${r}" fill="#FFC53D"/>`;
const icon=(k,day=true)=>{let b='';
  if(k==='clear')b=day?SUN(32,32,11):MOON;
  else if(k==='pc')b=(day?SUN(22,22,8):`<g transform="translate(-2 -2) scale(.65)">${MOON}</g>`)+`<g transform="translate(6 8) scale(.9)">${CL}</g>`;
  else{b=`<g transform="translate(0 ${['rain','snow','storm'].includes(k)?-6:0})">${CL}</g>`;
    if(k==='rain')b+=[24,32,40].map((x,i)=>`<line class="dr" style="animation-delay:${i*.25}s" x1="${x}" y1="44" x2="${x-3}" y2="54"/>`).join('');
    if(k==='snow')b+=[24,32,40].map((x,i)=>`<circle class="sn" style="animation-delay:${i*.3}s" cx="${x}" cy="48" r="2.4"/>`).join('');
    if(k==='storm')b+='<path d="M34 36l-8 13h6l-2 11 10-15h-6z" fill="#FFC53D"/>';
    if(k==='fog')b+=[49,55].map(y=>`<line class="fg" x1="16" y1="${y}" x2="48" y2="${y}"/>`).join('')}
  return `<svg class="ic" viewBox="0 0 64 64" aria-hidden="true">${b}</svg>`};

let U=store.get('unit','C'),city=store.get('city',{name:'Karachi',admin:'Sindh',country:'Pakistan',lat:24.8607,lon:67.0011}),recents=store.get('recent',[]),W=null,stale=false;
const T=t=>Math.round(U==='C'?t:t*9/5+32)+'°';
const WS=v=>U==='C'?Math.round(v)+' km/h':Math.round(v/1.609)+' mph';
const hr12=h=>(h%12||12)+(h<12?' AM':' PM');
const tm=s=>{const h=+s.slice(11,13);return (h%12||12)+':'+s.slice(14,16)+(h<12?' AM':' PM')};
const DIR=d=>['N','NE','E','SE','S','SW','W','NW'][Math.round(d/45)%8];
const uvL=u=>u<3?'Low':u<6?'Moderate':u<8?'High':u<11?'Very high':'Extreme';

/* ---------- Weather ---------- */
const wurl=c=>`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&hourly=temperature_2m,weather_code,precipitation_probability,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto&forecast_days=7`;
async function loadWeather(){
  const h=$('#hero');h.dataset.w='load';h.innerHTML='<div class="sk"></div>';
  const key=city.lat+','+city.lon;
  try{const r=await fetch(wurl(city));if(!r.ok)throw 0;W=await r.json();stale=false;store.set('wc',{k:key,d:W})}
  catch(e){const c=store.get('wc',null);if(c&&c.k===key){W=c.d;stale=true}else{W=null;h.dataset.w='err';h.innerHTML='<div class="err"><h2>Couldn’t load the weather</h2><p class="mu">Check your internet connection and try again.</p><button class="btn" id="retry" type="button">Try again</button></div>';$('#tiles').innerHTML='';$('#hr').innerHTML='';$('#dy').innerHTML='';$('#retry').onclick=loadWeather;return}}
  renderW();
}
function renderW(){
  const c=W.current,d=W.daily,H=W.hourly,k=kind(c.weather_code),night=!c.is_day,h=$('#hero');
  h.dataset.w=(k==='clear'||k==='pc')?(night?'night':'clear'):k;
  h.innerHTML=`<div class="ht"><div><h1>${city.name}</h1><p>${[city.admin,city.country].filter(Boolean).join(', ')}${city.admin||city.country?' · ':''}<span id="lt"></span></p></div><button class="ib gl" id="rf" type="button" aria-label="Refresh weather">↻</button></div>
<div class="hm"><div><div class="deg">${T(c.temperature_2m)}</div><p class="cond">${LBL[c.weather_code]||'Weather'}</p><div class="hl"><span>High ${T(d.temperature_2m_max[0])}</span><span>Low ${T(d.temperature_2m_min[0])}</span><span>Feels like ${T(c.apparent_temperature)}</span></div></div><div class="hi">${icon(k,!night)}</div></div>
<p class="upd">Updated ${tm(c.time)}${stale?'<span class="off">Offline, saved data</span>':''}</p>`;
  $('#rf').onclick=loadWeather;clock();
  const t=(a,v,x='')=>`<div class="tl"><span>${a}</span><b>${v}</b>${x}</div>`;
  $('#tiles').innerHTML=[t('Feels like',T(c.apparent_temperature)),t('Humidity',c.relative_humidity_2m+'%',`<div class="mb"><i style="width:${c.relative_humidity_2m}%"></i></div>`),t('Wind',WS(c.wind_speed_10m),`<small><span class="ar" style="transform:rotate(${c.wind_direction_10m+180}deg)">↑</span> from ${DIR(c.wind_direction_10m)}</small>`),t('Pressure',Math.round(c.pressure_msl),'<small>hPa</small>'),t('UV index',Math.round(d.uv_index_max[0]),`<small>${uvL(d.uv_index_max[0])}</small>`),t('Rain chance',(d.precipitation_probability_max[0]??0)+'%'),t('Sunrise',tm(d.sunrise[0])),t('Sunset',tm(d.sunset[0]))].join('');
  const i0=Math.max(0,H.time.findIndex(x=>x.startsWith(c.time.slice(0,13)))),temps=H.temperature_2m.slice(i0,i0+24),lo=Math.min(...temps),hi=Math.max(...temps);
  $('#hr').innerHTML=H.time.slice(i0,i0+24).map((x,j)=>{const i=i0+j,p=18+82*(H.temperature_2m[i]-lo)/((hi-lo)||1);return `<div class="hc${j?'':' now'}"><small>${j?hr12(+x.slice(11,13)):'Now'}</small>${icon(kind(H.weather_code[i]),H.is_day[i])}<b>${T(H.temperature_2m[i])}</b><div class="bt"><i style="height:${p}%"></i></div><small>${H.precipitation_probability[i]??0}%</small></div>`}).join('');
  const dl=Math.min(...d.temperature_2m_min),dh=Math.max(...d.temperature_2m_max),sp=dh-dl||1;
  $('#dy').innerHTML=d.time.map((x,i)=>{const mn=d.temperature_2m_min[i],mx=d.temperature_2m_max[i];return `<div class="dr2"><b>${i?new Date(x+'T12:00:00').toLocaleDateString('en-US',{weekday:'short'}):'Today'}</b>${icon(kind(d.weather_code[i]))}<small class="pc">${d.precipitation_probability_max[i]??0}%</small><small>${T(mn)}</small><div class="rg"><i style="left:${(mn-dl)/sp*100}%;width:${Math.max(8,(mx-mn)/sp*100)}%"></i></div><b>${T(mx)}</b></div>`}).join('');
}
const clock=()=>{const e=$('#lt');if(e&&W)e.textContent=new Date().toLocaleString('en-US',{timeZone:W.timezone,weekday:'short',hour:'numeric',minute:'2-digit'})};
setInterval(clock,30000);setInterval(loadWeather,600000);

/* ---------- Units ---------- */
const paintUnit=()=>$$('#unit button').forEach(b=>b.classList.toggle('on',b.dataset.u===U));
$$('#unit button').forEach(b=>b.onclick=()=>{U=b.dataset.u;store.set('unit',U);paintUnit();if(W)renderW()});
paintUnit();

/* ---------- City search ---------- */
let sug=[],st;
const hideSug=()=>{$('#sug').hidden=true;$('#q').setAttribute('aria-expanded','false')};
function showSug(msg){const u=$('#sug');u.innerHTML=msg?`<li><p>${msg}</p></li>`:sug.map((c,i)=>`<li><button type="button" data-i="${i}" role="option"><span>${c.name}</span><small>${[c.admin,c.country].filter(Boolean).join(', ')}</small></button></li>`).join('');u.hidden=false;$('#q').setAttribute('aria-expanded','true')}
async function search(v){
  try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(v)}&count=6&language=en&format=json`);const j=await r.json();
    sug=(j.results||[]).map(x=>({name:x.name,admin:x.admin1,country:x.country,lat:x.latitude,lon:x.longitude}));showSug(sug.length?'':'No city found. Try another spelling.')}
  catch(e){sug=[];showSug('Search needs an internet connection.')}
}
$('#q').oninput=e=>{clearTimeout(st);const v=e.target.value.trim();if(v.length<2)return hideSug();st=setTimeout(()=>search(v),280)};
$('#q').onkeydown=e=>{if(e.key==='Escape')hideSug();if(e.key==='Enter'&&sug.length&&!$('#sug').hidden)pick(sug[0])};
$('#sug').onclick=e=>{const b=e.target.closest('[data-i]');if(b)pick(sug[+b.dataset.i])};
document.addEventListener('click',e=>{if(!e.target.closest('.sb'))hideSug()});
function pick(c){city=c;store.set('city',c);recents=[c,...recents.filter(x=>!(x.name===c.name&&x.country===c.country))].slice(0,8);store.set('recent',recents);$('#q').value='';hideSug();paintRecents();loadWeather()}
function paintRecents(){$('#rc').hidden=!recents.length;$('#rc').innerHTML=recents.map((c,i)=>`<button class="chip" type="button" data-r="${i}">${c.name}</button>`).join('')}
$('#rc').onclick=e=>{const b=e.target.closest('[data-r]');if(b)pick(recents[+b.dataset.r])};
paintRecents();
$('#loc').onclick=()=>{if(!navigator.geolocation){toast('Location is not supported on this device');return}
  navigator.geolocation.getCurrentPosition(p=>pick({name:'My location',country:'',lat:p.coords.latitude,lon:p.coords.longitude}),()=>toast('Location was blocked. Type a city instead.'))};

/* ---------- Currency ---------- */
let RT=null,pair=store.get('pair',['USD','PKR']),stamp='',rStale=false,DN=null;
try{DN=new Intl.DisplayNames(['en'],{type:'currency'})}catch(e){}
const POP=['USD','PKR','EUR','GBP','SAR','AED','INR','CNY','JPY','CAD','AUD','TRY'];
const nf=(v,m)=>v.toLocaleString('en-US',{maximumFractionDigits:m??(v<1?4:2)});
async function loadRates(){
  try{const r=await fetch('https://open.er-api.com/v6/latest/USD');const j=await r.json();if(j.result!=='success')throw 0;RT=j.rates;RT.USD=1;stamp=j.time_last_update_utc;rStale=false;store.set('rc',{rates:RT,stamp})}
  catch(e){const c=store.get('rc',null);if(!c){$('#outl').textContent='Rates unavailable';$('#out').textContent='--';$('#rt').textContent='Connect to the internet once to load rates.';return}RT=c.rates;stamp=c.stamp;rStale=true}
  if(!$('#from').options.length)fillCur();
  convert();
}
function fillCur(){
  const o=Object.keys(RT).sort().map(c=>`<option value="${c}">${c}${DN?' – '+(DN.of(c)||''):''}</option>`).join('');
  $('#from').innerHTML=o;$('#to').innerHTML=o;
  $('#from').value=RT[pair[0]]?pair[0]:'USD';$('#to').value=RT[pair[1]]?pair[1]:'PKR';
}
function convert(){
  if(!RT)return;const a=+$('#amt').value||0,f=$('#from').value,t=$('#to').value;
  pair=[f,t];store.set('pair',pair);
  $('#outl').textContent=`${nf(a)} ${f} =`;
  $('#out').textContent=nf(a/RT[f]*RT[t])+' '+t;
  $('#rt').textContent=`1 ${f} = ${nf(RT[t]/RT[f],4)} ${t}`;
  $('#rl').innerHTML=POP.filter(c=>c!==f&&RT[c]).map(c=>`<button class="rc2" type="button" data-c="${c}"><b>${c}</b><small>${DN?(DN.of(c)||''):''}</small><span>${nf(RT[c]/RT[f],4)}</span></button>`).join('');
  $('#up').textContent='Updated '+new Date(stamp).toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'})+(rStale?' · saved rates':'');
}
$('#qa').innerHTML=[1,10,100,1000,10000].map(n=>`<button class="chip" type="button" data-a="${n}">${n.toLocaleString('en-US')}</button>`).join('');
$('#qa').onclick=e=>{const b=e.target.closest('[data-a]');if(b){$('#amt').value=b.dataset.a;convert()}};
$('#rl').onclick=e=>{const b=e.target.closest('[data-c]');if(b){$('#to').value=b.dataset.c;convert()}};
['amt','from','to'].forEach(i=>$('#'+i).addEventListener('input',convert));
$('#swap').onclick=()=>{const f=$('#from').value;$('#from').value=$('#to').value;$('#to').value=f;convert()};
setInterval(loadRates,1800000);

loadWeather();loadRates();
