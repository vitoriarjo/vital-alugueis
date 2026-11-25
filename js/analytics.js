/* Optional analytics: no external request until consent. */
(()=> {
 const KEY='vital.analytics.consent.v1';
 const banner=document.getElementById('analytics-consent'), settings=document.getElementById('analytics-settings');
 if(!banner||!settings)return;
 let consent=null, config=null, visit=null, pageSent=false;
 const events=new Set(['page_view','equipment_select','whatsapp_click','quote_whatsapp_open','phone_click','map_click']);
 const equipment=new Set(['Andaimes','Betoneiras','Escoramentos','Mais de um equipamento','Outro / consultar']);
 const sections=new Set(['inicio','equipamentos','vantagens','orcamento','localizacao','duvidas','cta','floating','footer','header']);
 try{consent=localStorage.getItem(KEY)}catch{}
 function send(detail){
  if(consent!=='yes'||!config||!events.has(detail.name))return;
  try{
   visit ||= crypto.randomUUID();
   const props={distinct_id:visit,$process_person_profile:false};
   if(equipment.has(detail.equipment))props.equipment=detail.equipment;
   if(sections.has(detail.section))props.section=detail.section;
   if(detail.name==='page_view'){if(pageSent)return;pageSent=true;}
   const body=JSON.stringify({api_key:config.token,event:detail.name,properties:props});
   fetch(config.host+'/capture/',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true,credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{});
  }catch{}
 }
 function choice(value){
  consent=value;try{localStorage.setItem(KEY,value)}catch{}
  banner.hidden=true;
  if(value==='yes')send({name:'page_view'});else{visit=null;pageSent=false;}
 }
 document.addEventListener('vital:conversion',e=>send(e.detail||{}));
 document.getElementById('analytics-accept').addEventListener('click',()=>choice('yes'));
 document.getElementById('analytics-reject').addEventListener('click',()=>choice('no'));
 settings.addEventListener('click',()=>{banner.hidden=false;document.getElementById('analytics-accept').focus()});
 fetch('/.netlify/functions/analytics-config',{credentials:'same-origin',cache:'no-store'}).then(r=>r.ok?r.json():null).then(v=>{
  if(!v||typeof v.token!=='string'||!v.token||v.host!=='https://us.i.posthog.com')return;
  config=v;settings.hidden=false;
  if(consent==='yes')send({name:'page_view'});else if(consent!=='no')banner.hidden=false;
 }).catch(()=>{});
})();
