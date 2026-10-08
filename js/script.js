const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// Theme
const store={get(){try{return localStorage.getItem('nx-theme')}catch(e){return null}},
             set(v){try{localStorage.setItem('nx-theme',v)}catch(e){}
            }
        };
const setTheme=t=>{document.documentElement.dataset.theme=t;const b=$('#theme');
    if(b){b.textContent=t==='dark'?'☀':'☾';
        b.setAttribute('aria-label','Switch to '+(t==='dark'?'light':'dark')+' theme')
    }
};
setTheme(store.get()||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));
// Shared navbar + footer
const pages=[['index.html','Home'],
             ['about.html','About'],
             ['services.html','Services'],
             ['contact.html','Contact']
            ];
const cur=location.pathname.split('/').pop()||'index.html';
const L=c=>pages.map(([h,n])=>`<a href="${h}" class="${h===cur?'active':''}">${n}</a>`).join('');
$('#nav-root').outerHTML=`<header id="nav">
                          <div class="wrap bar">
                          <a href="index.html" class="brand"><span class="logo">N</span>NEXORA</a>
                          <nav class="links" aria-label="Main">${L()}</nav>
                          <div class="right">
                          <button id="theme" class="ib"></button>
                          <a href="start-project.html" class="btn btn-p">Start a Project</a>
                          <button id="burger" class="ib" aria-label="Menu" aria-expanded="false">☰</button>
                          </div>
                          </div>
                          <div id="menu">
                          <nav class="mlinks">${L()}</nav>
                          <a href="start-project.html" class="btn btn-p">Start a Project</a>
                          </div>
                          </header>`;
$('#footer-root').outerHTML=`<footer>
                             <div class="wrap sec grid gap-8 sm:grid-cols-2 lg:grid-cols-4" style="padding:3rem 1.25rem">
                             <div>
                             <div class="brand">NEXORA</div>
                             <p style="margin-top:.6rem">Build Beyond Boundaries.</p>
                             </div>
                             <div>
                             <h3>Company</h3>
                             <ul>
                             <li><a href="about.html">About</a></li>
                             <li><a href="contact.html">Contact</a></li>
                             <li><a href="start-project.html">Start a Project</a></li>
                             </ul>
                             </div>
                             <div>
                             <h3>Services</h3>
                             <ul>
                             <li><a href="services.html">Web Development</a></li>
                             <li><a href="services.html">App Development</a></li>
                             <li><a href="services.html">AI &amp; Automation</a></li>
                             </ul>
                             </div>
                             <div>
                             <h3>Contact</h3>
                             <ul>
                             <li><a href="mailto:hello@nexora.com">hello@nexora.com</a></li>
                             <li>Bhopal, India</li>
                             </ul>
                             </div>
                             </div>
                             <div class="wrap" style="padding:1.2rem;text-align:center;border-top:1px solid var(--line);font-size:.8rem;color:var(--muted)">© 2026 Nexora. All rights reserved.</div>
                             </footer>`;
setTheme(document.documentElement.dataset.theme);
$('#theme').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(t);store.set(t)};
const burger=$('#burger'),menu=$('#menu');
burger.onclick=()=>burger.setAttribute('aria-expanded',menu.classList.toggle('open'));
addEventListener('scroll',()=>$('#nav').classList.toggle('scrolled',scrollY>20),{passive:true});
                              $('#nav').classList.toggle('scrolled',scrollY>20);
// Reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
             e.target.classList.add('in');
             io.unobserve(e.target)}
            }
        ),
        {threshold:.12}
    );
    $$('.rv').forEach(e=>io.observe(e));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
         co.unobserve(e.target);
         const to=+e.target.dataset.to,t0=performance.now();
         const f=t=>{const p=Math.min((t-t0)/1400,1);
            e.target.textContent=Math.round(to*(1-(1-p)**3));
            p<1&&requestAnimationFrame(f)};
            requestAnimationFrame(f)}),{threshold:.6});
            $$('.count').forEach(e=>co.observe(e));
// Forms (front-end validation only; connect to your backend or a form service)
$$('form[data-form]').forEach(f=>f.addEventListener('submit',
        e=>{e.preventDefault();
            let ok=true;
            $$('[required]',f).forEach(i=>{const v=i.value.trim(),er=i.parentElement.querySelector('.err');let m='';
                 if(!v)m='This field is required.';
                 else if(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(v))m='Enter a valid email address.';
                 if(er)er.textContent=m;if(m)ok=false}
                );
                if(ok){f.reset();
                     $('.ok',f.parentElement).classList.add('show')}
        }
    )
);
