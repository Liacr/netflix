const html = document.documentElement;
const switchTema = document.getElementById('switch-tema');

// Chave para o localStorage
const THEME_KEY = 'netflix-theme';

// Funções Auxiliares
const getSavedTheme = () => localStorage.getItem(THEME_KEY);
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

const aplicarTema = (tema, save = true) => {
    // Aplicamos a classe no HTML (ex: light-theme ou dark-theme)
    html.classList.remove('light-theme', 'dark-theme');
    html.classList.add(`${tema}-theme`);
    
    // Sincroniza o Checkbox (Marcar se for light)
    if (switchTema) switchTema.checked = (tema === 'light');
    
    // Salva apenas se for uma ação do usuário
    if (save) localStorage.setItem(THEME_KEY, tema);
};

// Event Listener Centralizado (Substitui o onchange do HTML)
if (switchTema) {
    switchTema.addEventListener('change', () => {
        const novoTema = switchTema.checked ? 'light' : 'dark';
        aplicarTema(novoTema);
    });
}

// Inicialização
const init = () => {
    const temaInicial = getSavedTheme() || getSystemTheme();
    aplicarTema(temaInicial, false);
};

// Rodar assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);

// Ouvir mudanças do sistema em tempo real
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!getSavedTheme()) {
        aplicarTema(e.matches ? 'dark' : 'light', false);
    }
});