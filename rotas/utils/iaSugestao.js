// Dentro de rotas/utils/iaSugestao.js
const sugerirSolucao = (texto) => {
    // Exemplo de lógica simples (substitua pela sua)
    if (texto.includes("lento")) return "Sugestão: Verificar consumo de CPU no servidor.";
    if (texto.includes("fora")) return "Sugestão: Reiniciar o serviço de rede.";
    
    return "Sugestão: Analisar logs detalhados do sistema.";
};

// ESSA LINHA É OBRIGATÓRIA:
module.exports = sugerirSolucao;