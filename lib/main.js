var prefs = require("sdk/preferences/service");
var self = require("sdk/self");

require("sdk/page-mod").PageMod({
  include: ["*.vesti.ru"],
  attachTo: ["top"],
  contentScriptFile: self.data.url("modify.js"),
  contentScriptWhen: "start",
  contentScriptOptions: {
    quality: prefs.get(['extensions', self.id, 'quality'].join('.'))
  }
});