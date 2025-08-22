function calcularCenario(pct) {
  const onDemand = parseFloat(document.getElementById("on_demand_hourly").value);
  const discount = parseFloat(document.getElementById("reserved_discount_pct").value);
  const total = parseInt(document.getElementById("instances_total").value);
  const hours = parseInt(document.getElementById("hours_per_month").value);
  const upfront = parseFloat(document.getElementById("reserved_upfront_monthly").value);

  const priceReserved = onDemand * (1 - discount/100);
  const instReserved = Math.round(total * pct/100);
  const instOnDemand = total - instReserved;

  const costReserved = instReserved * (priceReserved * hours + upfront);
  const costOnDemand = instOnDemand * (onDemand * hours);
  const costTotal = costReserved + costOnDemand;

  const baseline = total * onDemand * hours;
  const savingAbs = baseline - costTotal;
  const savingPct = (savingAbs / baseline) * 100;

  return { pct, costTotal, savingAbs, savingPct };
}

function calcular(pct) {
  const r = calcularCenario(pct);
  atualizarDisplay(r);
  mostrarTabela([r]);
}

function calcularCustom() {
  const customPct = parseFloat(document.getElementById("reserved_share_pct").value);
  const r = calcularCenario(customPct);
  atualizarDisplay(r);
  mostrarTabela([r]);
}

function atualizarDisplay(r) {
  const display = document.getElementById("display");
  display.textContent = `Reservado: ${r.pct}% | Custo: $${r.costTotal.toFixed(2)} | Economia: ${r.savingPct.toFixed(1)}%`;
}

function mostrarTabela(resultados) {
  let html = "<h3>Detalhes</h3><table><tr><th>% Reservadas</th><th>Custo Total ($)</th><th>Economia ($)</th><th>Economia (%)</th></tr>";
  resultados.forEach(r => {
    html += `<tr>
      <td>${r.pct}%</td>
      <td>$ ${r.costTotal.toFixed(2)}</td>
      <td>$ ${r.savingAbs.toFixed(2)}</td>
      <td>${r.savingPct.toFixed(1)}%</td>
    </tr>`;
  });
  html += "</table>";
  document.getElementById("results").innerHTML = html;
}
