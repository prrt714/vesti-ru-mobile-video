var prefs = require('sdk/simple-prefs').prefs;

require("sdk/page-mod").PageMod({
  include: ["*.vesti.ru"],
  contentScriptFile: require("sdk/self").data.url("modify.js"),
  contentScriptWhen: "start",
  attachTo: ["top"],
  onAttach: function (worker) {
    worker.port.emit("attached", prefs);
  }
});