export const normalize=s=>s.toLowerCase().replace(/[’]/g,"'").replace(/[.,!?。？！]/g,'').replace(/\s+/g,' ').trim();
export function assessRequest(raw,scene,modal='Could'){
 const v=normalize(raw);const action=scene.action;const target=modal.toLowerCase();
 if(v===`${target} you ${action}`)return {kind:'target',title:'这次，用出了目标句型。',body:'当前情境的意图和本次请求句型都符合演示表达。一次成功会记录为本次证据，不直接算长期掌握。'};
 if(['can','could'].some(m=>v===`${m} you ${action}`)||v===`would you mind ${scene.mind}`||v===`please ${action}`)return {kind:'alternative',title:'这句话也能完成请求。',body:`这不是语法错误。今天重点练 ${modal} you + 动词原形；再试一次这个结构，会补充对应句型的证据。`};
 if(/^(can|could) you (to |sends\b|shows\b|explains\b|checks\b)/.test(v))return {kind:'form',title:'这里先调整动词形式。',body:'Can / Could + you 后面用动词原形，不加 to，也不加第三人称单数的 -s。保留你要表达的意思，再试一次。'};
 if(/^(can|could) you \w+/.test(v)&&!v.includes(action))return {kind:'unconfirmed',title:'结构有了，意思还需核对。',body:'原型只识别少量预设说法，不能据此判断你的表达对错。核对是否完成了当前请求；未识别的答案会保留为待确认。'};
 return {kind:'unconfirmed',title:'先保留这句，暂不判错。',body:'可能是另一种正确说法。当前原型没有完整语义评估；请对照情境与示例自查，这次不记为错误，也不直接记为掌握。'};
}
export function evaluateDiagnostic(q,response,audioPlayed){
 if(q.type==='choice'||q.type==='audio'){if(q.type==='audio'&&!audioPlayed)return {status:'unmeasured',note:'未使用音频，这题不记听力证据'};return {status:Number(response)===q.answer?'supported':'review',note:Number(response)===q.answer?'本题首次答对':'本题未通过，安排后续确认'};}
 if(q.id==='request-output'){const v=normalize(response);const r=['can i borrow your pen','could i borrow your pen','may i borrow your pen'].includes(v)?{kind:'alternative'}:assessRequest(response,{action:'lend me a pen',mind:'lending me a pen'},'Can');return {status:r.kind==='target'||r.kind==='alternative'?'supported':r.kind==='form'?'review':'unconfirmed',note:r.kind==='target'||r.kind==='alternative'?'本次无提示写出了请求':'自由表达需进一步确认',response};}
 const v=normalize(response);const valid=["i don't have to attend a meeting today","i don't have to go to a meeting today","i don't need to attend a meeting today","i do not have to attend a meeting today","i needn't attend a meeting today","i don't have to have a meeting today","i don't have to attend the meeting today"];
 if(valid.includes(v))return {status:'supported',note:'本次表达了「不必」',response};
 if(v.includes("can't")||v.includes('cannot')||v.includes('must not')||v.includes("mustn't"))return {status:'review',note:'本句更接近「不能 / 不允许」，需确认含义',response};
 return {status:'unconfirmed',note:'未识别的自由表达暂不判错',response};
}
export function chooseSupport(results){const comprehension=results.find(r=>r.id==='request-form');const production=results.find(r=>r.id==='request-output');return comprehension?.status==='supported'&&production?.status==='supported'?'independent':'scaffold';}
export function evidenceFor(results,node){return results.filter(r=>r.node===node);}
