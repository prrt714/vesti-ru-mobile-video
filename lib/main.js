var {Cc,Ci,Cu,Cr,Cm,components} = require("chrome");

var data = require("sdk/self").data;

require("sdk/page-mod").PageMod({
  include: ["*.vesti.ru"],
  attachTo: ["top"],
  contentScriptFile: data.url("modify.js"),
  contentScriptWhen: "start"
});
