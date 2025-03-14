// Função para abrir/fechar os tópicos
function toggleSection(id) {
  let section = document.getElementById(id);
  section.style.display = (section.style.display === "block") ? "none" : "block";
}

// Função para mostrar/ocultar a área de observação
function toggleObs(id, show) {
  let obs = document.getElementById(id);
  obs.style.display = show ? "block" : "none";
  if (!show) {
    obs.value = "";
  }
}
  function visualizarLancamentos() {
  // Exemplo: redireciona para uma planilha do Google Sheets.
  // Substitua 'YOUR_SHEET_ID' pelo ID real da sua planilha.
  window.open('https://docs.google.com/spreadsheets/d/e/2PACX-1vSHDh8vc69sO7yFrBHCbKBofvePffivyZkNi-c8LLLSdt8sITnH08MjsT3VoT16osyZNrIx9sUi_gI3/pubhtml?gid=0&single=true', '_blank');
}

document.getElementById("checklistForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let formData = new FormData(this);
  
  // Dados comuns a todas as linhas
  let dataValue    = formData.get("data")    || "";
  let unidadeValue = formData.get("unidade") || "";
  let blocoValue   = formData.get("bloco")   || "";
  
  // Configuração das perguntas: cada objeto contém o id do input de resposta, o texto da pergunta e o id do input de observação
  let perguntasConfig = [
    { id: "portaria1",    pergunta: "1.1 Caminhões do Recebimento",         obsId: "obs1"  },
    { id: "portaria2",    pergunta: "1.2 Títulos em trânsito",               obsId: "obs2"  },
    { id: "portaria3",    pergunta: "1.3 Pagamento Descarga Financeiro",     obsId: "obs3"  },
    { id: "devolucao1",   pergunta: "2.1 Tickets de devolução fechados",     obsId: "obs4"  },
    { id: "devolucao2",   pergunta: "2.2 Doca da devolução sem mercadorias",    obsId: "obs5"  },
    { id: "devolucao3",   pergunta: "2.3 Todas as notas finalizadas",         obsId: "obs6"  },
    { id: "acerto1",      pergunta: "3.1 Sobra do Recebimento",               obsId: "obs7"  },
    { id: "acerto2",      pergunta: "3.2 Estoque Zero",                       obsId: "obs8"  },
    { id: "objetos1",     pergunta: "4.1 Controle de Objetos em docas e ruas", obsId: "obs9"  },
    { id: "objetos2",     pergunta: "4.2 Objetos no 99",                      obsId: "obs10"  },
    { id: "tratamento1",  pergunta: "5.1 Pendencias do tratamento de perdas", obsId: "obs11" },
    { id: "tratamento2",  pergunta: "5.2 Pedidos fora do prazo",              obsId: "obs12" },
    { id: "tratamento3",  pergunta: "5.3 Organização da sala do tratamento",  obsId: "obs13" },
    { id: "tratamento4",  pergunta: "5.4 Ação comercial pendente",            obsId: "obs14" },
    { id: "transito1",    pergunta: "6.1 Notas em status de digitação",       obsId: "obs15" },
    { id: "auditoria1",   pergunta: "7.1 Relação das equipes de contagem",    obsId: "obs16" },
    { id: "organizacao1", pergunta: "8.1 Organização da unidade",             obsId: "obs17" },
    { id: "organizacao2", pergunta: "8.2 Cronograma de inventário",           obsId: "obs18" },
    { id: "cftv1",        pergunta: "9.1 Protocolo cargas externa",           obsId: "obs19" }
  ];
  
  // Cria um array de linhas; cada linha contém: data, unidade, bloco, pergunta, resposta e observacao
  let rows = perguntasConfig.map(item => ({
    data: dataValue,
    unidade: unidadeValue,
    bloco: blocoValue,
    pergunta: item.pergunta,
    resposta: formData.get(item.id) || "",
    observacao: document.getElementById(item.obsId)?.value || ""
  }));
  
  console.log("Dados a enviar para o SheetDB:", rows);
  
  // Envia os dados para o SheetDB: o JSON deve estar no formato { data: [ {linha1}, {linha2}, ... ] }
  fetch("https://sheetdb.io/api/v1/8x8fiyrw8ivzd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: rows })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Resposta da API:", data);
    alert("Checklist enviado com sucesso!");
    document.body.style.backgroundColor = "#90EE90";
  })
  .catch(error => console.error("Erro:", error));
});
