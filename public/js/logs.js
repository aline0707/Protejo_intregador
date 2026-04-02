{/* <script> */}
    function carregarLogs() {
        fetch("http://localhost:3000/logs")
            .then(res => {
                if (!res.ok) throw new Error("Erro ao buscar logs");
                return res.json();
            })
            .then(dados => {
                const lista = document.getElementById("listaLogs");
                
                // Usando map para gerar o HTML de forma mais performática
                lista.innerHTML = dados.map(log => {
                    // Lógica para definir a cor da ação
                    let classeCor = "";
                    const acao = log.acao.toLowerCase();
                    if (acao.includes("criou") || acao.includes("novo")) classeCor = "tipo-criacao";
                    else if (acao.includes("editou") || acao.includes("alterou")) classeCor = "tipo-edicao";
                    else if (acao.includes("resolveu") || acao.includes("fechou")) classeCor = "tipo-resolucao";
                    else if (acao.includes("erro") || acao.includes("falha")) classeCor = "tipo-erro";

                    // Formatação de data brasileira
                    const dataFormatada = new Date(log.data).toLocaleString('pt-BR');

                    return `
                        <tr>
                            <td>#${log.id}</td>
                            <td><strong>${log.usuario}</strong></td>
                            <td class="${classeCor}">${log.acao}</td>
                            <td>${log.incidente_id ? 'Incidente #' + log.incidente_id : '---'}</td>
                            <td>${dataFormatada}</td>
                        </tr>
                    `;
                }).join('');
            })
            .catch(err => console.error("Erro ao carregar logs:", err));
    }

    // Carregamento inicial
    carregarLogs();

    // Atualização automática (5 segundos)
    setInterval(carregarLogs, 5000);
{/* </script> */}
