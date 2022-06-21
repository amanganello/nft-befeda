const artCertificate = artifacts.require('ArtCertificate');

module.exports = function (deployer) {
  deployer.deploy(artCertificate);
};
