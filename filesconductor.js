const documentos = [
  `alturas avanzado.pdf`,
  `cedula.pdf`,
  `certificado bancario.pdf`,
  `foto.jpg`,
  `licencia.pdf`,
  `manejo defensivo.pdf`,
  `manejo extintor.pdf`,
  `manejo sustancias toxicas.pdf`,
  `mecanica basica.pdf`,
  `seguridad social.pdf`,
  `primeros auxilios.pdf`,
  `seguridad vial.pdf`,
  `simit.pdf`,
  `rut.pdf`,
  `vacunas.pdf`
];

function rutafiles(cedula) {
  let rutafiles = [
    `Documentos/Conductores/${cedula}/alturas avanzado.pdf`,
    `Documentos/Conductores/${cedula}/cedula.pdf`,
    `Documentos/Conductores/${cedula}/certificado bancario.pdf`,
    `Documentos/Conductores/${cedula}/licencia.pdf`,
    `Documentos/Conductores/${cedula}/manejo defensivo.pdf`,
    `Documentos/Conductores/${cedula}/manejo extintor.pdf`,
    `Documentos/Conductores/${cedula}/manejo sustancias toxicas.pdf`,
    `Documentos/Conductores/${cedula}/mecanica basica.pdf`,
    `Documentos/Conductores/${cedula}/seguridad social.pdf`,
    `Documentos/Conductores/${cedula}/primeros auxilios.pdf`,
    `Documentos/Conductores/${cedula}/seguridad vial.pdf`,
    `Documentos/Conductores/${cedula}/simit.pdf`,
    `Documentos/Conductores/${cedula}/rut.pdf`,
    `Documentos/Conductores/${cedula}/vacunas.pdf`
  ];
  return rutafiles;
}

module.exports.documentos = documentos;
module.exports.rutafiles = rutafiles;
