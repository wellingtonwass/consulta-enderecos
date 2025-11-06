document.addEventListener("DOMContentLoaded", () => {
  const cepBtn = document.getElementById("cep-btn");
  const cepInput = document.getElementById("cep-input");
  const cepClear = document.getElementById("cep-clear");

  const addressBtn = document.getElementById("address-btn");
  const addressInput = document.getElementById("address-input");
  const cityInput = document.getElementById("city-input");
  const ufSelect = document.getElementById("uf-select");
  const addressClear = document.getElementById("address-clear");

  const resultCount = document.getElementById("result-count");
  const filterContainer = document.getElementById("filter-container");
  const filterInput = document.getElementById("filter-input");
  const addressList = document.getElementById("address-list");
  const searchBanner = document.getElementById("search-banner");

  const searchTypeRadios = document.querySelectorAll("input[name='searchType']");

  // Mapa de UFs por extenso
  const ufNames = {
    "AC": "Acre",
    "AL": "Alagoas",
    "AP": "Amapá",
    "AM": "Amazonas",
    "BA": "Bahia",
    "CE": "Ceará",
    "DF": "Distrito Federal",
    "ES": "Espírito Santo",
    "GO": "Goiás",
    "MA": "Maranhão",
    "MT": "Mato Grosso",
    "MS": "Mato Grosso do Sul",
    "MG": "Minas Gerais",
    "PA": "Pará",
    "PB": "Paraíba",
    "PR": "Paraná",
    "PE": "Pernambuco",
    "PI": "Piauí",
    "RJ": "Rio de Janeiro",
    "RN": "Rio Grande do Norte",
    "RO": "Rondônia",
    "RR": "Roraima",
    "RS": "Rio Grande do Sul",
    "SC": "Santa Catarina",
    "SE": "Sergipe",
    "SP": "São Paulo",
    "TO": "Tocantins"
  };

  // Alternar tipo de busca
  searchTypeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      document.getElementById("cep-form").classList.toggle("hidden", radio.value !== "cep");
      document.getElementById("address-form").classList.toggle("hidden", radio.value !== "endereco");
      filterContainer.classList.add("hidden");
      addressList.innerHTML = "";
      resultCount.textContent = "";
    });
  });

  // Buscar CEP
  cepBtn.addEventListener("click", async () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (!cep) return;
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      addressList.innerHTML = "<p>CEP não encontrado.</p>";
      return;
    }
    showResults([data]);
  });

  // Buscar endereço
  addressBtn.addEventListener("click", async () => {
    const uf = ufSelect.value;
    const cidade = cityInput.value.trim();
    const logradouro = addressInput.value.trim();

    if (!cidade || !logradouro) return;
    const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);
    const data = await response.json();
    if (!Array.isArray(data)) {
      addressList.innerHTML = "<p>Nenhum endereço encontrado.</p>";
      return;
    }
    showResults(data);
  });

  // Buscar ao pressionar ENTER
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const selectedType = document.querySelector("input[name='searchType']:checked").value;
      if (selectedType === "cep") {
        cepBtn.click();
      } else {
        addressBtn.click();
      }
    }
  });

  // Limpar formulários
  cepClear.addEventListener("click", () => {
    cepInput.value = "";
    addressList.innerHTML = "";
    resultCount.textContent = "";
    filterInput.value = ""; // Limpa o filtro
  });

  addressClear.addEventListener("click", () => {
    addressInput.value = "";
    cityInput.value = "Marabá";
    ufSelect.value = "PA";
    addressList.innerHTML = "";
    resultCount.textContent = "";
    filterInput.value = ""; // Limpa o filtro
  });

  // Mostrar resultados
  function showResults(results) {
    addressList.innerHTML = "";
    filterContainer.classList.remove("hidden");
    resultCount.textContent = `Exibindo ${results.length} endereço(s) encontrado(s)`;
    searchBanner.classList.remove("hidden");
    setTimeout(() => searchBanner.classList.add("visible"), 50);
    setTimeout(() => searchBanner.classList.remove("visible"), 2500);

    const colors = ["#007A33", "#FFD100", "#0033A0", "#C8102E"];

    results.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.borderLeftColor = colors[index % colors.length];
      card.innerHTML = `
        <div class="cep-line">
          <span>CEP: ${item.cep}</span>
          <button class="copy-btn" onclick="copyToClipboard('${item.cep}', this)">Copiar CEP</button>
        </div>
        <p><strong>Logradouro:</strong> ${item.logradouro || "-"}</p>
        <p><strong>Bairro:</strong> ${item.bairro || "-"}</p>
        <p><strong>Complemento:</strong> ${item.complemento || "-"}</p>
        <p><strong>Cidade:</strong> ${item.localidade || "-"}</p>
        <div class="uf-estado">
          <p><strong>UF:</strong> ${item.uf || "-"}</p>
          <p><strong>Estado:</strong> ${ufNames[item.uf] || "-"}</p>
        </div>
        <p><strong>Região:</strong> ${getRegion(item.uf)}</p>
        <p><strong>Código IBGE:</strong> ${item.ibge || "-"}</p>
        <p><strong>DDD:</strong> ${item.ddd || "-"}</p>
        <p><strong>SIAFI:</strong> ${item.siafi || "-"}</p>
      `;
      addressList.appendChild(card);
    });

    // Filtro dinâmico
    filterInput.oninput = () => {
      const search = filterInput.value.toLowerCase();
      const cards = addressList.querySelectorAll(".card");
      let visibleCount = 0;

      cards.forEach(card => {
        if (card.textContent.toLowerCase().includes(search)) {
          card.style.display = "";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });
      resultCount.textContent = search
        ? `Exibindo ${visibleCount} de ${results.length} endereços`
        : `Exibindo ${results.length} endereço(s) encontrado(s)`;
    };
  }

  // Função auxiliar para retornar a região a partir da UF
  function getRegion(uf) {
    const regions = {
      "AC": "Norte", "AP": "Norte", "AM": "Norte", "PA": "Norte", "RO": "Norte", "RR": "Norte", "TO": "Norte",
      "MA": "Nordeste", "PI": "Nordeste", "CE": "Nordeste", "RN": "Nordeste", "PB": "Nordeste", "PE": "Nordeste",
      "AL": "Nordeste", "SE": "Nordeste", "BA": "Nordeste",
      "MG": "Sudeste", "ES": "Sudeste", "RJ": "Sudeste", "SP": "Sudeste",
      "PR": "Sul", "SC": "Sul", "RS": "Sul",
      "DF": "Centro-Oeste", "GO": "Centro-Oeste", "MT": "Centro-Oeste", "MS": "Centro-Oeste"
    };
    return regions[uf] || "-";
  }
});

// Copiar CEP com feedback no botão
function copyToClipboard(cep, buttonElement) {
  navigator.clipboard.writeText(cep).then(() => {
    if (buttonElement) {
      const originalText = buttonElement.textContent;
      buttonElement.textContent = "Copiado";
      buttonElement.disabled = true;
      buttonElement.classList.add("copied");
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.disabled = false;
        buttonElement.classList.remove("copied");
      }, 2000);
    }
  });
}
