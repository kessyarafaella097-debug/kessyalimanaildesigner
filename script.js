// Formatador de Telefone
function formatarTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    if (valor.length <= 2) {
        return valor;
    } else if (valor.length <= 7) {
        return `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else {
        return `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    }
}

// Event Listener para Telefone
const telefonInput = document.getElementById('telefone');
if (telefonInput) {
    telefonInput.addEventListener('input', function(e) {
        e.target.value = formatarTelefone(e.target.value);
    });
}

// Validação de Data Mínima
function definirDataMinima() {
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        dataInput.min = `${ano}-${mes}-${dia}`;
    }
}

definirDataMinima();

// Submissão do Formulário
document.getElementById('form-agendamento').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    // Converter data para formato brasileiro
    const dataObj = new Date(data + 'T00:00:00');
    const dataBrasileira = dataObj.toLocaleDateString('pt-BR');

    // Mensagem para WhatsApp
    let mensagemWhatsApp = `Olá! Gostaria de agendar um atendimento:\n\n`;
    mensagemWhatsApp += `*Nome:* ${nome}\n`;
    mensagemWhatsApp += `*Data:* ${dataBrasileira}\n`;
    mensagemWhatsApp += `*Horário:* ${hora}\n`;
    mensagemWhatsApp += `*Serviço:* ${servico}\n`;
    
    if (mensagem) {
        mensagemWhatsApp += `*Mensagem:* ${mensagem}\n`;
    }

    // Link WhatsApp (substitua pelo número real)
    const numeroWhatsApp = '5511999999999'; // Altere para o número real
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;

    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');

    // Mostrar mensagem de sucesso
    mostrarMensagem('✓ Redirecionando para WhatsApp...', 'sucesso');

    // Limpar formulário após 1 segundo
    setTimeout(() => {
        document.getElementById('form-agendamento').reset();
    }, 1000);
});

// Função para mostrar mensagens
function mostrarMensagem(texto, tipo) {
    const mensagem = document.createElement('div');
    mensagem.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    if (tipo === 'sucesso') {
        mensagem.style.backgroundColor = '#d4af37';
        mensagem.style.color = '#1a1a1a';
    } else if (tipo === 'erro') {
        mensagem.style.backgroundColor = '#e74c3c';
        mensagem.style.color = '#fff';
    }

    mensagem.textContent = texto;
    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => mensagem.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Suavizar scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Efeito de scroll para destacar seção ativa
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = '#d4af37';
                activeLink.style.borderBottomColor = '#d4af37';
            }
        }
    });
});

// Validação básica do formulário
document.getElementById('form-agendamento').addEventListener('change', function() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    
    if (nome && telefone.replace(/\D/g, '').length >= 10) {
        console.log('Formulário válido');
    }
});

