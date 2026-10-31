import React from 'react';
import {Clapperboard, Check} from 'lucide-react';

export function Header({onHome}) {
  return <header className="header"><button className="brand" onClick={onHome}><span className="logo"><Clapperboard size={23}/></span>FrameFlow<span className="ai">AI</span></button><div className="header-right"><span className="demo"><i/> Interactive demo</span><span className="header-note">A little idea. A whole story.</span></div></header>;
}

export function StepIndicator({page}) {
  const current = ['create', 'analyzing'].includes(page) ? 0 : page === 'storyboard' ? 1 : 2;
  return <nav className="steps" aria-label="创作进度">{['Idea','Storyboard','Preview'].map((name, index) => <React.Fragment key={name}>{index > 0 && <span className={'step-line '+(current >= index ? 'done' : '')}/>}<div aria-current={current === index ? 'step' : undefined} className={'step '+(current === index ? 'active' : current > index ? 'complete' : '')}><span>{current > index ? <Check size={14}/> : index+1}</span>{name}</div></React.Fragment>)}</nav>;
}
