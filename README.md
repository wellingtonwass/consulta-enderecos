# 🏛️ Consulta de Endereços — Prefeitura de Marabá

Aplicação web estática para **consulta de endereços via CEP ou logradouro**, utilizando a API pública **ViaCEP**.  
Desenvolvido para a **Secretaria Municipal de Gestão Fazendária (SEGFAZ)** da **Prefeitura Municipal de Marabá**.

---

## 🚀 Acesso Público

O sistema pode ser acessado diretamente pelo GitHub Pages:  
👉 **[https://wellingtonwass.github.io/consulta-enderecos/](https://wellingtonwass.github.io/consulta-enderecos/)**  

*(Após o primeiro deploy, o GitHub pode levar alguns minutos para gerar o link HTTPS.)*

---

## 📂 Estrutura do Projeto

| Arquivo | Descrição |
|----------|------------|
| `index.html` | Página principal da aplicação. |
| `style.css` | Folha de estilos (layout e design). |
| `script.js` | Lógica da aplicação — busca de CEPs, filtros, interações. |
| `brasao_maraba.png` | Brasão oficial da Prefeitura de Marabá. |
| `README.md` | Este guia de publicação e manutenção. |

---

## 🧭 Funcionalidades Principais

- 🔍 Busca de endereços **por CEP** ou **por logradouro**.  
- 🧾 Exibição de detalhes completos: logradouro, bairro, cidade, UF, IBGE, DDD, SIAFI.  
- 🧩 Filtro dinâmico de resultados.  
- 📋 Botão “Copiar CEP” com feedback visual.  
- 🌈 Cabeçalho e banners animados com cores institucionais.  
- ✅ Compatível com HTTPS, clipboard API e dispositivos móveis.  

---

## 🌐 Publicação via GitHub Pages

1. Faça login no GitHub e acesse o repositório:  
   👉 [https://github.com/wellingtonwass/consulta-enderecos](https://github.com/wellingtonwass/consulta-enderecos)

2. Vá em **Settings → Pages** (ou **Configurações → Pages**).  
3. Em **Source**, selecione:
   ```
   Branch: main
   Folder: /(root)
   ```
4. Clique em **Save**.

Em poucos segundos, o site estará disponível em:
> 🌍 https://wellingtonwass.github.io/consulta-enderecos/

---

## 🔁 Atualização do Site

Para atualizar o site após modificar qualquer arquivo (`index.html`, `style.css`, `script.js`, etc.):

```bash
git add .
git commit -m "Atualização do site"
git push
```

O GitHub Pages fará o deploy automaticamente.  
Basta recarregar a página para visualizar a nova versão.

---

## ⚙️ Publicação Local (opcional)

Se quiser testar localmente antes do deploy:

1. Abra um terminal na pasta do projeto.  
2. Execute um servidor local simples (exemplo com Python):

```bash
python -m http.server 8080
```

3. Acesse em: [http://localhost:8080](http://localhost:8080)

---

## 🌍 Domínio Personalizado (opcional)

Se desejar usar um domínio institucional (ex: `sis.maraba.pa.gov.br`):

1. Vá em **Settings → Pages → Custom domain**.  
2. Insira o domínio desejado e salve.  
3. No painel DNS do domínio, crie um registro **CNAME** apontando para:
   ```
   wellingtonwass.github.io
   ```
4. Ative o HTTPS (GitHub faz automaticamente).

---

## 🧠 Observações Técnicas

- O site depende da API pública **[ViaCEP](https://viacep.com.br/)**.  
- O uso de HTTPS é **obrigatório** para funcionamento do `navigator.clipboard` (GitHub Pages já fornece HTTPS).  
- Certifique-se de que o arquivo `brasao_maraba.png` esteja no mesmo diretório do `index.html`.  
- Paths relativos (`style.css`, `script.js`) devem permanecer inalterados.  

---

## 🏗️ Histórico de Versões

| Versão | Data | Descrição |
|--------|------|------------|
| **1.3.23** | 2025 | Versão estável — compatível com HTTPS, banner animado e filtro dinâmico. |

---

## 👨‍💻 Autor e Contato

**Desenvolvido por:** [Wellington Sobrinho](https://github.com/wellingtonwass)  
**Secretaria Municipal de Gestão Fazendária (SEGFAZ)**  
**Prefeitura Municipal de Marabá**

📧 Contato institucional: [segfaz@maraba.pa.gov.br](mailto:segfaz@maraba.pa.gov.br)

---

### 📜 Licença

Este projeto é de uso público e institucional.  
Distribuição e modificações permitidas apenas mediante autorização da Prefeitura de Marabá.

---
