// WhatsApp comercial: (85) 99689-2438. Telefone para ligações: (85) 98833-3415.
  const PHONE = '5585996892438';
  const form = document.querySelector('#quote-form');
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-equipment]').forEach(link=>link.addEventListener('click',()=>{
    document.querySelector('#equipment').value=link.dataset.equipment;
  }));
  form.addEventListener('submit', event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const get=id=>document.getElementById(id).value.trim();
    const lines=[
      'Olá! Gostaria de solicitar um orçamento na Vital Aluguéis.',
      '',
      '*Nome:* '+get('customer'),
      '*Equipamento:* '+get('equipment'),
      '*Quantidade:* '+(get('quantity')||'A definir'),
      '*Período:* '+get('duration'),
      '*Local da obra:* '+(get('neighborhood')||'A informar'),
      '*Detalhes:* '+(get('details')||'Sem observações')
    ];
    const url='https://wa.me/'+PHONE+'?text='+encodeURIComponent(lines.join('\n'));
    document.querySelector('#quote-status').textContent='Abrindo o WhatsApp para você revisar e enviar a mensagem.';
    vitalEvent('quote_whatsapp_open',{equipment:get('equipment')});
    window.location.assign(url);
  });
 
// Integration point for future consent-aware analytics. No network or storage.
function vitalEvent(name, detail = {}) {
  document.dispatchEvent(new CustomEvent('vital:conversion', {detail:{name,...detail}}));
}
document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const section = link.closest('section');
  const source = link.classList.contains('float-wa') ? 'floating' : link.closest('footer') ? 'footer' : section?.id || (section?.classList.contains('cta') ? 'cta' : 'header');
  if (href.startsWith('https://wa.me/')) vitalEvent('whatsapp_click',{section:source});
  else if (href.startsWith('tel:')) vitalEvent('phone_click',{section:source});
  else if (href.startsWith('https://www.google.com/maps/')) vitalEvent('map_click',{section:source});
  else if (link.dataset.equipment) vitalEvent('equipment_select',{equipment:link.dataset.equipment});
});
vitalEvent('page_view');
