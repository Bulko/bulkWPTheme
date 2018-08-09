var oyana = require('gulp-oyana');
var options = {
	"jsMinPath" : "./jsMin",
	"jsPath" : "./js",
	"jsName" : "main.min",
	"cssPath" : "./css",
	"scssPath" : "./scss",
	"outputStyle" : "compressed"
}
oyana( options );
