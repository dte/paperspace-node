var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

paperspace.machines.start({
   machineId: "PSSIQ341",
 }, function(err, resp) {
   if (err) {
     console.log(err);
     process.exit(1);
   }
   console.log(resp.body);
});
