(() => {
  'use strict';
  const stages = [
    {
      status: 'Published methods', title: 'Generate with a purpose.',
      copy: 'Start with a lead or a design brief. Use search and progressive generation to explore candidates under structural and property constraints.',
      tools: 'Research building blocks: MolSearch · Chain-of-Generation · TRACE'
    },
    {
      status: 'Published methods', title: 'Compare candidates in context.',
      copy: 'Predict molecular properties and transcriptional effects. Use these signals to prioritize candidates, then review the trade-offs with domain experts.',
      tools: 'Research building blocks: MoCL · GPS · TRACE'
    },
    {
      status: 'With experimental collaborators', title: 'Let biology answer.',
      copy: 'Synthesize or source selected compounds and measure their effects in relevant assays. Both promising and unsuccessful results help test the biological hypothesis.',
      tools: 'Published example: experimental validation in the GPS study, Cell 2026'
    },
    {
      status: 'Future research direction', title: 'Make every outcome informative.',
      copy: 'Use experimental outcomes to refine predictive models and choose the next candidates or measurements. The research goal is better decisions under limited experimental budgets.',
      tools: 'Joint research opportunity: experimental feedback · adaptive learning · next-experiment selection'
    }
  ];
  const buttons = [...document.querySelectorAll('[data-stage]')];
  const nodes = [...document.querySelectorAll('[data-node]')];
  const play = document.getElementById('play-loop');
  const title = document.getElementById('loop-detail-title');
  const copy = document.getElementById('loop-detail-copy');
  const tools = document.getElementById('loop-detail-tools');
  const status = document.getElementById('loop-status');
  const count = document.getElementById('loop-count');
  const live = document.querySelector('.loop-detail');
  let current = 0;
  let timer = null;
  const update = index => {
    current = index;
    const stage = stages[index];
    buttons.forEach((button, i) => {
      button.classList.toggle('selected', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
    nodes.forEach((node, i) => node.classList.toggle('current', i === index));
    status.textContent = stage.status;
    title.textContent = stage.title;
    copy.textContent = stage.copy;
    tools.textContent = stage.tools;
    count.textContent = `0${index + 1} / 04`;
  };
  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
    play.innerHTML = '<span aria-hidden="true">▶</span> Play the loop';
    play.setAttribute('aria-pressed', 'false');
    live.setAttribute('aria-live', 'polite');
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    stop();
    update(Number(button.dataset.stage));
  }));
  play.addEventListener('click', () => {
    if (timer !== null) { stop(); return; }
    play.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause the loop';
    play.setAttribute('aria-pressed', 'true');
    live.setAttribute('aria-live', 'off');
    update((current + 1) % stages.length);
    timer = window.setInterval(() => update((current + 1) % stages.length), 3800);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  const links = [...document.querySelectorAll('.nav-inner a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let scheduled = false;
  const updateNav = () => {
    scheduled = false;
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 140) active = section; });
    links.forEach(link => {
      const selected = link.getAttribute('href') === `#${active.id}`;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateNav); }
  }, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
  updateNav();
})();
