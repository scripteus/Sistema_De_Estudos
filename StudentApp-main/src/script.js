  // --- Função para navegação entre seções ---
  const navButtons = document.querySelectorAll('nav button');
  const sections = document.querySelectorAll('section');
  const btnRemoveMateria = document.getElementById('btn-trash');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(btn.dataset.section).classList.add('active');

      if (btn.dataset.section === 'anotacoes') {
        carregarSelectMaterias();
        mostrarAnotacoes();
      }
      if (btn.dataset.section === 'graficos') {
        desenharGrafico();
      }
    });
  });

  // --- Matérias ---
  const listaMaterias = document.getElementById('listaMaterias');
  const formMateria = document.getElementById('form-materia');

  function carregarMaterias() {
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    return materias;
  }

  function salvarMaterias(materias) {
    localStorage.setItem('materias', JSON.stringify(materias));
  }

  function removerMateria(indice) {
  let materias = JSON.parse(localStorage.getItem('materias')) || [];

  if (indice >= 0 && indice < materias.length) {
    materias.splice(indice, 1);

    localStorage.setItem('materias', JSON.stringify(materias));

  } else {
    console.log("Índice inválido! Não tem matéria nessa posição.");
  }
}

  function mostrarMaterias() {
    let materias = carregarMaterias();
    listaMaterias.innerHTML = '';
    materias.forEach((m, i) => {
      let li = document.createElement('div');
      li.id = i++;
      li.textContent = m;
      li.CDATA_SECTION_NODE
      li.classList.add('materias-cadastradas');

      //TODO ver trash
      let trash = document.createElement("button");
      trash.id = "btn-trash";
      trash.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
      trash.addEventListener('click', (e) => {
        e.preventDefault();
        let pai = e.target.parentElement;

        removerMateria(pai.id);
        carregarMaterias();
        mostrarMaterias()
      });

      
      li.appendChild(trash);
      listaMaterias.appendChild(li);

    });
  }

  formMateria.addEventListener('submit', e => {
    e.preventDefault();
    let nome = document.getElementById('nomeMateria').value.trim();
    if (!nome) return alert('Digite o nome da matéria!');
    let materias = carregarMaterias();
    if(materias.includes(nome)) {
      alert('Matéria já cadastrada!');
      return;
    }
    materias.push(nome);
    salvarMaterias(materias);
    mostrarMaterias();
    formMateria.reset();
  });

  mostrarMaterias();

  // --- Anotações ---
  const selectMateria = document.getElementById('selectMateria');
  const formAnotacao = document.getElementById('form-anotacao');
  const editor = document.getElementById('editor');
  const listaAnotacoesDiv = document.getElementById('listaAnotacoes');

  function carregarSelectMaterias() {
    let materias = carregarMaterias();
    selectMateria.innerHTML = '<option value="">-- Selecione --</option>';
    materias.forEach(m => {
      let opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      selectMateria.appendChild(opt);
    });
  }

  function carregarAnotacoes() {
    return JSON.parse(localStorage.getItem('anotacoes')) || [];
  }

  function salvarAnotacoes(anotacoes) {
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
  }

  function removerAnotacoes(id) {
    let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
    anotacoes = anotacoes.filter(anotacao => anotacao.id !== id);
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
  }

  // Botões de formatação do editor
  document.querySelectorAll('.format-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.execCommand(btn.dataset.command, false, null);
      editor.focus();
    });
  });

  formAnotacao.addEventListener('submit', e => {
    e.preventDefault();
    const titulo = document.getElementById('tituloAnotacao').value.trim();
    const materia = selectMateria.value;
    const texto = editor.innerHTML.trim();
    
    if(!titulo || !materia || !texto) {
      alert('Preencha todos os campos e escreva a anotação!');
      return;
    }
    
    let anotacoes = carregarAnotacoes();
    anotacoes.push({ id: Date.now(), titulo, materia, texto });
    salvarAnotacoes(anotacoes);
    formAnotacao.reset();
    editor.innerHTML = '';
    mostrarAnotacoes();
  });

  function mostrarAnotacoes() {
    let idBtn = 0;
    let anotacoes = carregarAnotacoes();
    listaAnotacoesDiv.innerHTML = '';
    if(anotacoes.length === 0) {
      listaAnotacoesDiv.textContent = 'Você não tem anotações.';
      return;
    }
    anotacoes.forEach(anot => {
      const modal = document.getElementById('anotacao-modal');
      const btn = document.createElement('div');
      btn.className = 'anotacao-item';
      btn.id = idBtn++;
      btn.textContent = `${anot.materia} • ${anot.titulo}`;
      btn.addEventListener('click', () => abrirModalAnotacao(anot));

      //TODO ----- INIT TRASH BUTTON -----
      // let trash = document.createElement("button");
      // trash.id = "btn-trash-two";
      // trash.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
      // trash.addEventListener('click', (e) => {
      //   const janelas = document.querySelectorAll('.modal-content');
        
        
      //   janelas.forEach(janela => {
      //     let pai = janela.parentElement;
      //     janela.style.display = 'none';
      //     pai.style.display = 'none';
      //     pai.style.visibility = 'hidden';
      //   })


      //   e.preventDefault();
      //   let pai = e.target.parentElement;


      //   removerAnotacoes(Number(pai.id));
      //   carregarAnotacoes();
      //   mostrarAnotacoes();
      // });

      
      // btn.appendChild(trash);
      //  -------- FIM ADD TRASH BUTTON ---------
      listaAnotacoesDiv.appendChild(btn);
    });
    
    
    modal.style.visibility = 'visible';
  }

  // Modal anotação
  const modal = document.getElementById('anotacao-modal');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalTexto = document.getElementById('modal-texto');

  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });


  function abrirModalAnotacao(anot) {
    modalTitulo.textContent = `[${anot.materia}] ${anot.titulo}`;
    modalTexto.innerHTML = anot.texto;
    modal.style.display = 'flex';
  }

  // --- Temporizador ---
  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-timer');
  const stopBtn = document.getElementById('stop-timer');

  let timer = null;
  let segundos = 0;

  function atualizarDisplay() {
    let h = Math.floor(segundos / 3600);
    let m = Math.floor((segundos % 3600) / 60);
    let s = segundos % 60;
    timerDisplay.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  startBtn.addEventListener('click', () => {
    if(timer) return;
    timer = setInterval(() => {
      segundos++;
      atualizarDisplay();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  stopBtn.addEventListener('click', () => {
    if(!timer) return;
    clearInterval(timer);
    timer = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    if(segundos > 0) {
      salvarTempoEstudo(segundos);
      segundos = 0;
      atualizarDisplay();
      alert('Tempo de estudo salvo!');
    }
  });

  function carregarTemposEstudo() {
    return JSON.parse(localStorage.getItem('temposEstudo')) || [];
  }

  function salvarTempoEstudo(segundosEstudo) {
    let tempos = carregarTemposEstudo();
    tempos.push({ timestamp: Date.now(), segundos: segundosEstudo });
    localStorage.setItem('temposEstudo', JSON.stringify(tempos));
  }

  // --- Gráfico ---
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');

  function desenharGrafico() {
    const tempos = carregarTemposEstudo();
    if(tempos.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '20px Arial';
      ctx.fillText('Nenhum dado de estudo para mostrar.', 10, 50);
      return;
    }

    const semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    let somaPorDia = [0,0,0,0,0,0,0];

    const hoje = new Date();
    const msPorDia = 24 * 3600 * 1000;

    tempos.forEach(t => {
      let d = new Date(t.timestamp);
      let diffDias = Math.floor((hoje - d) / msPorDia);
      if(diffDias >=0 && diffDias < 7) {
        let diaSemana = d.getDay();
        somaPorDia[diaSemana] += t.segundos;
      }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(650, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(50, 30);
    ctx.stroke();

    const maxSegundos = Math.max(...somaPorDia);
    const maxMinutos = Math.ceil(maxSegundos / 60 / 10) * 10 || 10;

    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';

    for(let i = 0; i <= maxMinutos; i += maxMinutos / 5) {
      let y = 250 - (i / maxMinutos) * 220;
      ctx.fillText(`${Math.round(i)} min`, 10, y+5);
      ctx.beginPath();
      ctx.moveTo(45, y);
      ctx.lineTo(50, y);
      ctx.stroke();
    }

    const larguraBarra = 70;
    const espacamento = 20;
    for(let i=0; i < 7; i++) {
      let alturaBarra = (somaPorDia[i] / (maxMinutos*60)) * 220 || 0;
      ctx.fillStyle = '#00796b';
      ctx.fillRect(50 + espacamento + i*(larguraBarra+espacamento), 250 - alturaBarra, larguraBarra, alturaBarra);

      ctx.fillStyle = 'black';
      ctx.fillText(semana[i], 50 + espacamento + i*(larguraBarra+espacamento) + larguraBarra/3, 270);
    }
  }