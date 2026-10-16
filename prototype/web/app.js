import {scenes,structures,diagnostic,makeCustom,sentence} from './data.js';
import {assessRequest,evaluateDiagnostic,chooseSupport} from './logic.js';
import {today,sceneView,structureView,profileView,diagnosticView,esc,btn} from './views.js';
import {practiceView} from './practice.js';
const main=document.querySelector('#main');
const state={sceneId:'company',previewId:'company',customScenes:[],modal:'Could',support:'scaffold',supportSource:'initial',diagnosticSupport:null,customDraft:{},diagnostic:[],diagnosticSession:null,session:null,practiceEvidence:[],notice:'',detail:null,diagnosticCredit:false};
const allScenes=()=>[...scenes,...state.customScenes];const scene=id=>allScenes().find(s=>s.id===id)||scenes[0];
const route=()=>location.hash.slice(1)||'today';
function announce(text){document.querySelector('#announcement').textContent=text;}
function go(page){state.notice='';if(route()===page)render(true);else location.hash=page;}
function render(focus=false){
 const page=route();let html='';
 if(page==='today')html=today(state,scene(state.sceneId));
 else if(page==='scenes')html=sceneView(state,scene(state.previewId));
 else if(page==='structures'){html=structureView(state);if(state.detail){const s=structures.find(n=>n.id===state.detail);html+=`<section class="structure-note"><h2>${s.title} · 内容预览</h2><p>${s.grammar}</p><p class="english">${s.example}</p><p>${s.meaning}</p><p>这个知识点需要分别积累理解与产出证据。当前交互课程完整演示「请求句」；其他节点在这里先展示路线与内容。</p>${btn('回到今日句型练习','go-today','text-button')}</section>`;}}
 else if(page==='profile')html=profileView(state);
 else if(page==='diagnostic')html=diagnosticView(state);
 else if(page==='practice'&&state.session)html=practiceView(state,scene(state.session.sceneId));
 else{go('today');return;}
 main.innerHTML=html;document.querySelectorAll('[data-route]').forEach(a=>{const active=a.dataset.route===page||a.dataset.route==='today'&&['practice','diagnostic'].includes(page);a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(focus){main.focus();window.scrollTo({top:0,behavior:'instant'});}document.title=`句步 · ${{today:'今日学习',scenes:'我的场景',structures:'语法与句型',profile:'学习档案',diagnostic:'快速摸底',practice:'每日练习'}[page]}`;
}
function speak(text,onComplete=()=>{},onFailure=()=>{},rate=.85){if(!('speechSynthesis' in window)){onFailure();announce('当前浏览器无法朗读，听力保留待评估。');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=rate;u.onend=onComplete;u.onerror=()=>{onFailure();announce('音频播放失败，请重试或改用阅读体验。');};speechSynthesis.speak(u);}
function newSession(skipReview=false){state.session={sceneId:state.sceneId,step:skipReview?1:0,choice:null,reviewChecked:false,audioPlayed:false,listenChecked:false,listenMode:'audio',meaningVisible:false,audioPending:false,answer:'',hints:0,attempts:0,feedback:null,writingChecked:false};state.diagnosticCredit=false;go('practice');}
function nextStep(){const s=state.session;s.step++;s.choice=null;s.answer='';s.hints=0;s.attempts=0;s.feedback=null;s.writingChecked=false;state.notice='';render(true);}
function record(kind,sentenceText,sc,label){const record={node:'request',type:kind,scene:sc,sentence:sentenceText,label};state.practiceEvidence.push(record);}
function diagnosticNext(skip=false){
 const d=state.diagnosticSession,q=diagnostic[d.index];const response=q.options?d.selected:d.answer;
 if(!skip&&(response===null||!String(response).trim())){state.notice='请先作答，或者选择「暂时不会」。';render();document.querySelector('#diagnostic-answer')?.focus();return;}
 const result=skip?{status:'unmeasured',note:'本题没有作答，先保留待评估'}:evaluateDiagnostic(q,response,d.audioPlayed);
 d.results.push({...result,id:q.id,node:q.node,dimension:q.dimension});d.index++;d.answer='';d.selected=null;d.audioPlayed=false;state.notice='';
 if(d.index===diagnostic.length){state.diagnostic=[...d.results];state.diagnosticSupport=chooseSupport(d.results);state.support=state.diagnosticSupport;state.supportSource='diagnostic';state.modal=state.support==='independent'?'Could':'Can';state.diagnosticCredit=true;}render(true);
}
function handle(action,element){
 const id=element.dataset.id,s=state.session;
 const nav={ 'go-today':'today','go-profile':'profile','go-scenes':'scenes'};
 if(nav[action]){go(nav[action]);return;}
 if(action==='quick-scene'){state.sceneId=id;state.previewId=id;state.notice=`已切换到${scene(id).name}，请求句进度继续保留。`;render();announce(state.notice);return;}
 if(action==='preview-scene'){state.previewId=id;render();return;}
 if(action==='use-scene'){state.sceneId=id;state.previewId=id;go('today');state.notice=`已使用${scene(id).name}场景，继续同一个请求句型。`;render();return;}
 if(action==='structure-detail'){if(id==='request'){go('today');return;}state.detail=id;render();main.lastElementChild?.scrollIntoView({behavior:'smooth',block:'nearest'});return;}
 if(action==='less-support'||action==='more-support'){state.support=action==='less-support'?'independent':'scaffold';state.supportSource='manual';state.notice=action==='less-support'?'已减少默认中文与拆词支架，摸底证据保持不变。':'已展开中文解释与句型拆解，摸底证据保持不变。';render();announce(state.notice);return;}
 if(action==='diagnostic'){state.diagnosticSession=null;go('diagnostic');return;}
 if(action==='begin-diagnostic'){state.diagnosticSession={index:0,results:[],answer:'',selected:null,audioPlayed:false};state.notice='';render(true);return;}
 if(action==='diagnostic-choice'){state.diagnosticSession.selected=Number(id);render();document.querySelector(`button[data-action="diagnostic-choice"][data-id="${id}"]`)?.focus();return;}
 if(action==='diagnostic-audio'){const d=state.diagnosticSession,index=d.index;d.audioPlayed=false;d.audioPending=true;const update=success=>{if(d!==state.diagnosticSession||d.index!==index)return;d.audioPlayed=success;d.audioPending=false;state.notice=success?'音频已播放完成。':'播放失败，本题听力暂不评估。';render();};speak(diagnostic[index].audio,()=>update(true),()=>update(false));render();return;}
 if(action==='next-diagnostic'||action==='skip-question'){diagnosticNext(action==='skip-question');return;}
 if(action==='start-after-diagnostic'){newSession(true);return;}
 if(action==='skip-diagnostic'){newSession(false);return;}
 if(action==='restart-session'){newSession(state.diagnosticCredit);return;}
 if(action==='start-session'){if(state.session&&state.session.step<6){go('practice');return;}if(!state.diagnostic.length){state.diagnosticSession=null;go('diagnostic');}else newSession(state.diagnosticCredit);return;}
 if(!s)return;
 if(action==='next-step'){nextStep();return;}
 if(action==='review-choice'||action==='listen-choice'){s.choice=Number(id);render();document.querySelector(`button[data-action="${action}"][data-id="${id}"]`)?.focus();return;}
 if(action==='check-review'){s.reviewChecked=true;render();return;}
 if(action==='lesson-audio'){s.audioPlayed=false;s.audioPending=true;const update=success=>{if(state.session!==s||s.step!==1)return;s.audioPlayed=success;s.audioPending=false;state.notice=success?'音频已播放完成。':'播放失败，可以重试或改用阅读体验。';render();};speak(scene(s.sceneId).listen,()=>update(true),()=>update(false),state.support==='scaffold'?.72:.92);render();return;}
 if(action==='listen-reading'){s.audioPlayed=true;s.listenMode='reading';render();return;}
 if(action==='check-listening'){s.listenChecked=true;render();return;}
 if(action==='show-meaning'){s.meaningVisible=true;render();return;}
 if(action==='sentence-audio'){speak(sentence(scene(s.sceneId),state.modal));return;}
 if(action==='hint'){s.hints=Math.min(s.hints+1,3);render();return;}
 if(action==='submit-request'||action==='submit-transfer'){
  if(!s.answer.trim()){state.notice='先写下一句，再提交。';render();document.querySelector('#practice-answer')?.focus();return;}
  const current=scene(s.sceneId),target=action==='submit-transfer'?current.transfer:current;s.attempts++;s.feedback=assessRequest(s.answer,target,state.modal);if(current.custom&&action==='submit-request'&&s.feedback.kind==='target')s.feedback={...s.feedback,title:'用出了本次目标句型。',body:'这是通用请求模板。是否完成你的具体任务，请对照你填写的目标自查；原型不会把句型匹配当成已完成具体任务。'};state.notice='';
  const label=current.custom&&action==='submit-request'&&s.feedback.kind==='target'?'句型符合 · 具体任务待自查':s.feedback.kind==='target'?(action==='submit-transfer'?(s.attempts===1?'新情境无提示表达':'新情境重试后表达'):(s.attempts>1?'反馈后重试表达':s.hints?'提示下完成':'练习后首次无提示表达')):s.feedback.kind==='alternative'?'表达可以 · 目标句型待检验':s.feedback.kind==='form'?'词形需要巩固':'意思与结构待确认';
  record(action==='submit-transfer'?'迁移检验':'句型练习',s.answer,action==='submit-transfer'?target.scene:current.name,label);render();return;
 }
 if(action==='check-writing'){if(!s.answer.trim()){state.notice='先写下你的回复，再对照参考。';render();document.querySelector('#practice-answer')?.focus();return;}s.writingChecked=true;state.notice='';render();}
}
document.addEventListener('click',e=>{if(e.target.closest('.skip')){e.preventDefault();main.focus();return;}const el=e.target.closest('[data-action]');if(!el||el.disabled||el.dataset.action==='save-custom')return;handle(el.dataset.action,el);});
document.addEventListener('input',e=>{if(e.target.form?.id==='custom-form')state.customDraft[e.target.name]=e.target.value;if(e.target.id==='diagnostic-answer'&&state.diagnosticSession)state.diagnosticSession.answer=e.target.value;if(e.target.id==='practice-answer'&&state.session)state.session.answer=e.target.value;});
document.addEventListener('submit',e=>{if(e.target.id!=='custom-form')return;e.preventDefault();const values=Object.fromEntries(new FormData(e.target));for(const key of ['name','role','goal'])values[key]=values[key].trim();if(!values.name||!values.role||!values.goal){document.querySelector('#custom-status').textContent='请填写场景名称、对方和你要完成的事。';return;}const id=`custom-${state.customScenes.length+1}`;state.customScenes.push(makeCustom(values,id));state.customDraft={};state.sceneId=id;state.previewId=id;go('today');state.notice=`已保存「${values.name}」。本场景先练通用请求，保留同一个语法进度。`;render();announce(state.notice);});
document.addEventListener('change',e=>{if(e.target.form?.id==='custom-form')state.customDraft[e.target.name]=e.target.value;});
window.addEventListener('hashchange',()=>render(true));render();
