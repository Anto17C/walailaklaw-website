const ALLOWED = new Set(['walailaklaw.com','www.walailaklaw.com','walailaklaw-en.pages.dev']);

const json = (data, status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const clean = (v,n) => String(v||'').trim().slice(0,n);
const esc   = v => v.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c]);
const field = (f,n,m) => clean(f.get(n),m);

const MATTERS = {criminal:'Criminal Case',bail:'Bail Bond',civil:'Civil Litigation',family:'Family Law',company:'Company Registration',realestate:'Real Estate',documents:'Legal Documents',visa:'Visa & Work Permit',arbitration:'Arbitration',other:'Other'};
const URGENCY = {emergency:'Emergency (within 24h)',urgent:'Urgent (this week)',normal:'Normal (no rush)'};

export async function onRequestPost(ctx){
  const req = ctx.request;
  const origin = req.headers.get('Origin');
  try{ if(!origin||!ALLOWED.has(new URL(origin).hostname)) return json({success:false,message:'Submission source not allowed.'},403); }
  catch{ return json({success:false,message:'Submission source not allowed.'},403); }

  if(Number(req.headers.get('Content-Length')||0) > 20000) return json({success:false,message:'Request too large.'},413);

  let form;
  try{ form = await req.formData(); }
  catch{ return json({success:false,message:'Could not read form data.'},400); }

  if(field(form,'website',200)) return json({success:true});

  const s = {
    name:     field(form,'name',120),
    phone:    field(form,'phone',40),
    email:    field(form,'email',254),
    matter:   field(form,'matter',60),
    urgency:  field(form,'urgency',60),
    location: field(form,'location',60),
    message:  field(form,'message',5000),
  };

  if(!s.name||!s.phone||!s.matter||!s.urgency||!s.message)
    return json({success:false,message:'Please complete all required fields.'},400);
  if(s.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email))
    return json({success:false,message:'Please enter a valid email address.'},400);

  const token = field(form,'cf-turnstile-response',2048);
  if(!token||!ctx.env.TURNSTILE_SECRET_KEY) return json({success:false,message:'Please complete the verification.'},400);

  const vb = new FormData();
  vb.append('secret',ctx.env.TURNSTILE_SECRET_KEY);
  vb.append('response',token);
  vb.append('remoteip',req.headers.get('CF-Connecting-IP')||'');
  let vr;
  try{ vr = await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:vb})).json(); }
  catch{ return json({success:false,message:'Verification temporarily unavailable. Please try again.'},503); }
  if(!vr.success||!ALLOWED.has(vr.hostname)) return json({success:false,message:'Verification failed. Please try again.'},400);

  const accountId = ctx.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken  = ctx.env.CLOUDFLARE_EMAIL_API_TOKEN;
  if(!accountId||!apiToken) return json({success:false,message:'Email delivery not configured.'},503);

  const safe = Object.fromEntries(Object.entries(s).map(([k,v])=>[k,esc(v)]));
  const matterLabel  = MATTERS[s.matter]  || s.matter;
  const urgencyLabel = URGENCY[s.urgency] || s.urgency;

  const text = ['NEW LEGAL ENQUIRY — walailaklaw.com','',
    `Name: ${s.name}`,`Phone: ${s.phone}`,`Email: ${s.email||'Not provided'}`,
    `Matter: ${matterLabel}`,`Urgency: ${urgencyLabel}`,`Office: ${s.location||'Not specified'}`,'',
    'Message:',s.message].join('\n');

  const html = `<h2 style="font-family:sans-serif;color:#0C0E13;">New Legal Enquiry</h2>
<p style="font-family:sans-serif;font-size:13px;color:#666;">From walailaklaw.com</p>
<table cellpadding="8" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse;max-width:520px;width:100%">
<tr style="background:#f5f5f5"><td style="font-weight:bold;width:130px">Name</td><td>${safe.name}</td></tr>
<tr><td style="font-weight:bold">Phone</td><td><a href="tel:${safe.phone}">${safe.phone}</a></td></tr>
<tr style="background:#f5f5f5"><td style="font-weight:bold">Email</td><td>${safe.email?`<a href="mailto:${safe.email}">${safe.email}</a>`:'Not provided'}</td></tr>
<tr><td style="font-weight:bold">Matter</td><td>${esc(matterLabel)}</td></tr>
<tr style="background:#f5f5f5"><td style="font-weight:bold">Urgency</td><td>${safe.urgency}</td></tr>
<tr><td style="font-weight:bold">Office</td><td>${safe.location||'Not specified'}</td></tr>
</table>
<h3 style="font-family:sans-serif;color:#0C0E13;margin-top:20px">Message</h3>
<p style="font-family:sans-serif;white-space:pre-wrap;background:#f9f9f9;padding:16px;border-radius:6px">${safe.message}</p>`;

  let er;
  try{
    er = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`,{
      method:'POST',
      headers:{Authorization:`Bearer ${apiToken}`,'Content-Type':'application/json'},
      body:JSON.stringify({to:'kae@walailaklaw.com',from:'website@walailaklaw.com',subject:`Legal Enquiry — ${s.name.replace(/[\r\n]/g,' ')} (${matterLabel})`,html,text})
    });
  }catch(e){ console.error('Email failed:',e); return json({success:false,message:'Could not send your message. Please call us directly.'},502); }

  if(!er.ok){ console.error('Email API error:',er.status,await er.text()); return json({success:false,message:'Could not send your message. Please email kae@walailaklaw.com directly.'},502); }
  return json({success:true});
}
