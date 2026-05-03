import { useState, useRef, useEffect, useCallback } from "react";

const COUNTRIES = [
  { code: "+1", flag: "🇺🇸" }, { code: "+44", flag: "🇬🇧" },
  { code: "+91", flag: "🇮🇳" }, { code: "+61", flag: "🇦🇺" },
  { code: "+49", flag: "🇩🇪" }, { code: "+33", flag: "🇫🇷" },
  { code: "+81", flag: "🇯🇵" }, { code: "+971", flag: "🇦🇪" },
  { code: "+65", flag: "🇸🇬" }, { code: "+55", flag: "🇧🇷" },
];

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0b0c10;}
  .ag-root{min-height:100vh;background:#0b0c10;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;padding:20px;position:relative;overflow:hidden;}
  .ag-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px);}
  .ag-o1{width:500px;height:500px;background:radial-gradient(circle,#7c5c2b,transparent);opacity:.18;top:-120px;right:-80px;animation:o1 14s ease-in-out infinite;}
  .ag-o2{width:380px;height:380px;background:radial-gradient(circle,#2b3a5c,transparent);opacity:.18;bottom:-60px;left:-100px;animation:o2 18s ease-in-out infinite;}
  .ag-o3{width:260px;height:260px;background:radial-gradient(circle,#5c3a2b,transparent);opacity:.15;top:50%;left:20%;animation:o3 22s ease-in-out infinite;}
  @keyframes o1{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,30px)}}
  @keyframes o2{0%,100%{transform:translate(0,0)}50%{transform:translate(50px,-20px)}}
  @keyframes o3{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,40px)}}
  .ag-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(196,162,103,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,103,.03) 1px,transparent 1px);background-size:60px 60px;}
  .ag-card{width:100%;max-width:440px;background:#12141a;border:1px solid rgba(255,255,255,.07);border-radius:24px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.6),0 0 0 1px rgba(196,162,103,.06);position:relative;z-index:1;}
  .ag-bar{height:2px;background:linear-gradient(90deg,transparent,#c4a267,transparent);opacity:.7;}
  .ag-inner{padding:40px 44px 44px;}
  .ag-brand{display:flex;align-items:center;gap:10px;margin-bottom:32px;}
  .ag-bicon{width:36px;height:36px;background:rgba(196,162,103,.15);border:1px solid rgba(196,162,103,.3);border-radius:10px;display:flex;align-items:center;justify-content:center;}
  .ag-bname{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#f0ece3;letter-spacing:.01em;}
  .ag-bname span{color:#c4a267;}
  .ag-h1{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:500;color:#f0ece3;line-height:1.15;margin-bottom:6px;}
  .ag-p{font-size:13.5px;color:#7a7875;margin-bottom:28px;line-height:1.5;}
  .ag-tabs{display:grid;grid-template-columns:1fr 1fr;background:#1a1d26;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:3px;margin-bottom:28px;position:relative;}
  .ag-slide{position:absolute;top:3px;bottom:3px;width:calc(50% - 3px);left:3px;background:#12141a;border:1px solid rgba(196,162,103,.25);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.3);transition:transform .28s cubic-bezier(.34,1.2,.64,1);}
  .ag-slide.r{transform:translateX(100%);}
  .ag-tab{position:relative;z-index:1;background:none;border:none;cursor:pointer;padding:9px 0;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;color:#7a7875;border-radius:7px;display:flex;align-items:center;justify-content:center;gap:7px;transition:color .22s;}
  .ag-tab.on{color:#f0ece3;}
  .ag-step{animation:fadeUp .32s ease both;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .ag-lbl{font-size:12px;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:#a09c96;margin-bottom:8px;display:block;}
  .ag-fw{margin-bottom:16px;}
  .ag-iw{position:relative;}
  .ag-ico{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:#7a7875;pointer-events:none;}
  .ag-inp{width:100%;height:50px;background:#1a1d26;border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#f0ece3;font-family:'DM Sans',sans-serif;font-size:15px;padding:0 16px 0 44px;outline:none;transition:border-color .2s,box-shadow .2s;}
  .ag-inp:focus{border-color:#c4a267;box-shadow:0 0 0 3px rgba(196,162,103,.12);}
  .ag-inp::placeholder{color:#7a7875;font-weight:300;}
  .ag-prow{display:flex;gap:8px;}
  .ag-ccw{position:relative;min-width:90px;}
  .ag-cc{width:100%;height:50px;background:#1a1d26;border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#f0ece3;font-family:'DM Sans',sans-serif;font-size:14px;padding:0 28px 0 12px;outline:none;cursor:pointer;appearance:none;transition:border-color .2s;}
  .ag-cc:focus{border-color:#c4a267;box-shadow:0 0 0 3px rgba(196,162,103,.12);}
  .ag-arr{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #7a7875;pointer-events:none;}
  .ag-orow{display:flex;gap:10px;margin-bottom:6px;}
  .ag-otp{flex:1;height:58px;background:#1a1d26;border:1px solid rgba(255,255,255,.07);border-radius:12px;color:#f0ece3;font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;text-align:center;outline:none;caret-color:#c4a267;transition:border-color .2s,box-shadow .2s,transform .15s;}
  .ag-otp:focus{border-color:#c4a267;box-shadow:0 0 0 3px rgba(196,162,103,.15);transform:translateY(-2px);}
  .ag-otp.f{border-color:rgba(196,162,103,.4);background:rgba(196,162,103,.06);}
  .ag-meta{display:flex;justify-content:space-between;align-items:center;margin-top:10px;}
  .ag-hint{font-size:12.5px;color:#7a7875;}
  .ag-hint b{color:#e2c98a;font-weight:500;}
  .ag-resend{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:500;padding:0;transition:color .2s;}
  .ag-back{display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;color:#7a7875;font-size:13px;font-family:'DM Sans',sans-serif;padding:0;margin-bottom:18px;transition:color .2s;}
  .ag-back:hover{color:#c4a267;}
  .ag-btn{width:100%;height:52px;background:linear-gradient(135deg,#c4a267 0%,#a8874e 100%);border:none;border-radius:12px;color:#1a1208;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;margin-top:20px;letter-spacing:.01em;transition:transform .18s,box-shadow .18s;display:flex;align-items:center;justify-content:center;}
  .ag-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(196,162,103,.35);}
  .ag-btn:disabled{opacity:.5;cursor:not-allowed;}
  .ag-spin{width:18px;height:18px;border:2px solid rgba(26,18,8,.3);border-top-color:#1a1208;border-radius:50%;animation:spin .7s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .ag-err{font-size:12px;color:#e05a5a;margin-top:6px;}
  .ag-foot{text-align:center;margin-top:24px;font-size:12px;color:#7a7875;line-height:1.6;}
  .ag-foot a{color:#c4a267;text-decoration:none;}
  .ag-ok{text-align:center;padding:20px 0;animation:fadeUp .4s ease both;}
  .ag-okring{width:72px;height:72px;border-radius:50%;background:rgba(76,175,125,.12);border:1.5px solid rgba(76,175,125,.4);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
  .ag-okt{font-family:'Cormorant Garamond',serif;font-size:28px;color:#f0ece3;margin-bottom:8px;}
  .ag-oks{font-size:14px;color:#7a7875;}
  @media(max-width:480px){.ag-inner{padding:28px 24px 32px;}.ag-h1{font-size:26px;}.ag-otp{height:50px;font-size:22px;}}
`;

/* ── OTP Grid ── */
/* ── OTP Grid ── */
function OTPGrid({ values, onChange }) {
  const refs = useRef([]);
  
  const onInput = (i, e) => {
    const ch = e.target.value.replace(/\D/g, "").slice(0, 1);
    const n = [...values]; 
    n[i] = ch; 
    onChange(n);
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };
  
  const onKey = (i, e) => {
    if (e.key === "Backspace" && !values[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft"  && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };
  
  const onPaste = (i, e) => {
    e.preventDefault();
    const d = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const n = [...values]; 
    [...d].forEach((ch, j) => { if (i + j < 6) n[i + j] = ch; });
    onChange(n); 
    refs.current[Math.min(i + d.length, 5)]?.focus();
  };
  
  useEffect(() => { 
    setTimeout(() => refs.current[0]?.focus(), 50);
  }, []);
  
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '6px' }}>
      {values.map((v, i) => (
        <input 
          key={i} 
          ref={el => (refs.current[i] = el)}
          className={`ag-otp${v ? " f" : ""}`}
          maxLength={1} 
          type="text" 
          inputMode="numeric" 
          value={v}
          onChange={e => onInput(i, e)} 
          onKeyDown={e => onKey(i, e)} 
          onPaste={e => onPaste(i, e)}
          style={{
            width: '100%',
            maxWidth: '58px',
            height: '58px',
            background: '#1a1d26',
            border: '1px solid rgba(255,255,255,.07)',
            borderRadius: '12px',
            color: '#f0ece3',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '26px',
            fontWeight: '600',
            textAlign: 'center',
            outline: 'none',
            caretColor: '#c4a267',
            transition: 'border-color .2s, box-shadow .2s, transform .15s'
          }}
        />
      ))}
    </div>
  );
}

/* ── Countdown hook ── */
function useCountdown(active) {
  const [secs, setSecs] = useState(30);
  const [ready, setReady] = useState(false);
  const t = useRef(null);
  
  const start = useCallback(() => {
    setSecs(30); 
    setReady(false); 
    if (t.current) clearInterval(t.current);
    t.current = setInterval(() => {
      setSecs(s => { 
        if (s <= 1) { 
          if (t.current) clearInterval(t.current);
          setReady(true); 
          return 0; 
        } 
        return s - 1; 
      });
    }, 1000);
  }, []);
  
  useEffect(() => { 
    if (active) {
      start();
    }
    return () => {
      if (t.current) clearInterval(t.current);
    };
  }, [active, start]);
  
  return { secs, ready, start };
}

/* ── OTP Step (shared for email & phone) ── */
function OTPStep({ target, onBack, onVerify }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [busy, setBusy] = useState(false);
  const { secs, ready, start } = useCountdown(true);

  const verify = () => {
    if (otp.join("").length < 6) return;
    setBusy(true); 
    setTimeout(() => { 
      setBusy(false); 
      onVerify(); 
    }, 1400);
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    start();
  };

  return (
    <div className="ag-step">
      <button className="ag-back" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>
      <p className="ag-hint" style={{ marginBottom: 10 }}>Code sent to <b>{target}</b></p>
      <OTPGrid values={otp} onChange={v => setOtp(v)} />
      <div className="ag-meta">
        <span className="ag-hint">Didn't receive it?</span>
        <button 
          className="ag-resend" 
          disabled={!ready} 
          onClick={handleResend}
          style={{ color: ready ? "#c4a267" : "#7a7875", cursor: ready ? "pointer" : "default" }}
        >
          {ready ? "Resend code" : `Resend in ${secs}s`}
        </button>
      </div>
      <button className="ag-btn" onClick={verify} disabled={busy}>
        {busy ? <span className="ag-spin"/> : "Verify & Sign In"}
      </button>
    </div>
  );
}

/* ── Email Flow ── */
function EmailFlow({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const send = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
      setErr("Please enter a valid email address."); 
      return; 
    }
    setErr(""); 
    setBusy(true); 
    setTimeout(() => { 
      setBusy(false); 
      setStep(2); 
    }, 1400);
  };

  if (step === 2) return <OTPStep target={email.replace(/(.{2}).+(@)/, "$1***$2")} onBack={() => setStep(1)} onVerify={onSuccess}/>;

  return (
    <div className="ag-step">
      <div className="ag-fw">
        <label className="ag-lbl">Email address</label>
        <div className="ag-iw">
          <svg className="ag-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,6 12,13 22,6"/></svg>
          <input 
            className="ag-inp" 
            type="email" 
            placeholder="hello@example.com"
            value={email} 
            onChange={e => { setEmail(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && send()} 
            autoComplete="email"
          />
        </div>
        {err && <div className="ag-err">{err}</div>}
      </div>
      <button className="ag-btn" onClick={send} disabled={busy}>
        {busy ? <span className="ag-spin"/> : "Send verification code"}
      </button>
    </div>
  );
}

/* ── Phone Flow ── */
function PhoneFlow({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [cc, setCc] = useState("+91");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const send = () => {
    const cleanPhone = phone.trim().replace(/[\s\-]/g, '');
    if (!/^[0-9]{6,14}$/.test(cleanPhone)) { 
      setErr("Please enter a valid phone number."); 
      return; 
    }
    setErr(""); 
    setBusy(true); 
    setTimeout(() => { 
      setBusy(false); 
      setStep(2); 
    }, 1400);
  };

  if (step === 2) return <OTPStep target={`${cc} ****${phone.trim().replace(/[\s\-]/g, '').slice(-3)}`} onBack={() => setStep(1)} onVerify={onSuccess}/>;

  return (
    <div className="ag-step">
      <div className="ag-fw">
        <label className="ag-lbl">Phone number</label>
        <div className="ag-prow">
          <div className="ag-ccw">
            <select className="ag-cc" value={cc} onChange={e => setCc(e.target.value)}>
              {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
            </select>
            <div className="ag-arr"/>
          </div>
          <div className="ag-iw" style={{ flex: 1 }}>
            <svg className="ag-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <input 
              className="ag-inp" 
              type="tel" 
              placeholder="98765 43210"
              value={phone} 
              onChange={e => { setPhone(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && send()} 
              autoComplete="tel"
            />
          </div>
        </div>
        {err && <div className="ag-err">{err}</div>}
      </div>
      <button className="ag-btn" onClick={send} disabled={busy}>
        {busy ? <span className="ag-spin"/> : "Send verification code"}
      </button>
    </div>
  );
}

/* ── Main Export ── */
export default function UserLogin() {
  const [tab, setTab] = useState("email");
  const [done, setDone] = useState(false);

  return (
    <>
      <style>{G}</style>
      <div className="ag-root">
        <div className="ag-orb ag-o1"/><div className="ag-orb ag-o2"/><div className="ag-orb ag-o3"/>
        <div className="ag-grid"/>

        <div className="ag-card">
          <div className="ag-bar"/>
          <div className="ag-inner">

            {/* Brand */}
            <div className="ag-brand">
              <div className="ag-bicon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" stroke="#c4a267" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="ag-bname">AMI<span>GO</span></div>
            </div>

            {!done ? (
              <>
                <h1 className="ag-h1">Welcome back</h1>
                <p className="ag-p">Verify your identity to continue.</p>

                {/* Tabs */}
                <div className="ag-tabs">
                  <div className={`ag-slide${tab === "phone" ? " r" : ""}`}/>
                  <button className={`ag-tab${tab === "email" ? " on" : ""}`} onClick={() => setTab("email")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,6 12,13 22,6"/></svg>
                    Email
                  </button>
                  <button className={`ag-tab${tab === "phone" ? " on" : ""}`} onClick={() => setTab("phone")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    Phone
                  </button>
                </div>

                {tab === "email"
                  ? <EmailFlow key="email" onSuccess={() => setDone(true)}/>
                  : <PhoneFlow key="phone" onSuccess={() => setDone(true)}/>
                }

                <div className="ag-foot">
                  By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
                </div>
              </>
            ) : (
              <div className="ag-ok">
                <div className="ag-okring">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4caf7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="ag-okt">Verified!</div>
                <p className="ag-oks">You've been successfully authenticated.</p>
                <button className="ag-btn" style={{ marginTop: 28 }} onClick={() => { setDone(false); setTab("email"); }}>
                  Start over
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}