
$(document).ready(function(){
  $('.slide').slick({
    autoplay: true,
    arrows: false,
    dots: true
  });
  $('a[href^="#"]:not([href="#"])').click(function(event) {  // link starts with #, but not # alone
    let hash = this.hash;
    let duration = 1000;
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      if ("js-fast-scroll" in event.target.classList) {
        duration = 100;
        console.info('fast scroll');
      }
      let target = $(hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
          },
          {
            duration: duration,
            complete: () => location.hash = hash,
          }
        );
      }
    }
  });
  if (location.hash == "#thanks") {
    $("main > :not(.show-on-thanks)").addClass("hidden");
    $("main > .show-on-thanks").removeClass("hidden");
  }
  $("#commune").select2({
    placeholder: 'Seleccione una comuna',
    data: getSelect2CommuneOptions(),
  });
  // $("#country").select2({
  //   minimumResultsForSearch: Infinity
  // });
});
let i = 0;
togglePriority = (nameAndNumber) => {
  let numberPos = nameAndNumber.search(/[0-9]/);
  let number = nameAndNumber.substring(numberPos);
  let name = nameAndNumber.substring(0, numberPos);
  let otherNameAndNumber = name=="time" ? `cost${number}` : `time${number}`;
  label = document.querySelector(`[for=${nameAndNumber}]`);
  label.classList.add('selected');
  description = document.querySelector(`.description.${nameAndNumber}`);
  description.classList.remove('hidden');
  label = document.querySelector(`[for=${otherNameAndNumber}]`);
  label.classList.remove("selected");
  description = document.querySelector(`.description.${otherNameAndNumber}`);
  description.classList.add('hidden');
}
addOther = () => {
  product = document.getElementsByClassName('product')[0];
  toAppend = document.getElementById('other-products');
  div = document.createElement('div');
  div.innerHTML = "<hr/>" + product.innerHTML;
  div.innerHTML = div.innerHTML.replace(/([a-z])\d/g, `$1${i+1}`);
  div.classList.add('product');
  $(div).find('.file-name')[0].innerHTML = "";
  toAppend.appendChild(div);
  toAppend.classList.remove('hidden');
  i++;
}
fileChanged = (event) => {
  console.log(event.target);
  event.target.previousElementSibling.innerText = event.target.files[0].name;
}
changeSubmitButton = (event) => {
  let submitButton = document.querySelector('[type=submit]');
  submitButton.disabled = true;
  submitButton.innerText = "ENVIANDO COTIZACIÓN...";
}
showHideCommune = (event) => {
  let commune = document.getElementById("commune-field");
  if (event.target.value == "Chile") {
    commune.classList.remove("hidden");
  } else {
    commune.classList.add("hidden");
  }
}

regionsAndCommunes = {
  "Atacama": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "El Salvador", "Freirina", "Huasco", "Paipote", "Tierra Amarilla", "Vallenar"],
  "Antofagasta": ["Antofagasta", "Calama", "María Elena", "Mejillones", "San Pedro De Atacama", "Sierra Gorda", "Taltal", "Tocopilla"],
  "Arica Y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapaca": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
  "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Valparaíso": ["Algarrobo", "Artificio", "Barrancas", "Belloto", "Casablanca", "Concón", "Cabildo ", "Cachagua", "Calle Larga", "Cartagena", "Catapilco", "Catemu", "Curauma", "El Melon", "El Quisco", "El Tabo", "Juan Fernández", "Hijuelas", "Isla de Pascua", "La Calera", "La Cruz", "La Ligua", "Limache", "Llay Llay", "Los Andes", "Maitencillo", "Nogales", "Olmué", "Panquehue", "Papudo", "Pedegua", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quinquimo", "Quintero", "Reñaca", "Rinconada", "Rodelillo", "San Antonio", "San Esteban", "San Felipe", "San Pedro De Limache", "Santa María", "Santo Domingo", "Valparaíso", "Ventanas", "Villa Alemana", "Viña Del Mar", "Zapallar"],
  "Libertador Gral. Bernardo O`Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchigue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Maule": ["Talca", "Constitucion", "Cuperto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de La Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Angeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipueco", "Nueva Imperial", "Padre Las Casas", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Rio Bueno"],
  "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco Velez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Rio Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Aysén del Gral. Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Magallares y Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
  "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José De Maipo", "Colina", "Lampa", "Til Til", "San Bernardo", "Buin", "Calera De Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla De Maipo", "Padre Hurtado", "Peñaflor"]
};
getSelect2CommuneOptions = function() {
  var commune, communes, elem, region, result;
  result = [''];
  for (region in regionsAndCommunes) {
    communes = regionsAndCommunes[region];
    elem = {
      text: region,
      children: (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = communes.length; i < len; i++) {
          commune = communes[i];
          results.push({
            id: commune,
            text: commune
          });
        }
        return results;
      })()
    };
    result.push(elem);
  }
  return result;
};
