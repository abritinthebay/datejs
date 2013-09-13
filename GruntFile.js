// GruntFile for building the final compiled files from the core.
// Run using NodeJS and the Grunt module
var fs = require('fs');
var dirs = {
	core: 'core',
	i18n: 'i18n',
	build: 'build'
};
var getI18NFiles = function () {
	return fs.readdirSync(dirs.i18n);
};

var buildUglifyFileList = function (dev) {
	var output_path = dev ? 'development' : 'production';
	var output_ext = dev ? '.' : '.min.';
	var files = getI18NFiles();
	var output = {};
	files.map(function(item){
		var file_core_name = 'date-' + item.replace('.js', '');
		var dest = dirs.build + '/'+output_path+'/' + file_core_name.toLowerCase() + output_ext+'js';
		output[dest] = [dirs.build + '/development/' + file_core_name.toLowerCase() + output_ext+'js'];
		return dest;
	});
	output[dirs.build + '/'+output_path+'/' + 'date'+output_ext+'js'] = [dirs.build + '/development/' + 'date.js'];
	return output;
};

var banner = '/* \n' +
			' * Name: <%= pkg.name %>\n' +
			' * Version: <%= pkg.version %>-<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * Copyright: <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Original Project: 2008 <%= pkg.originator %>\n' +
			' * Licence: <%= pkg.license %>\n' +
			' * URL: <%= pkg.homepage %>\n' +
			' */\n';

// console.log(buildUglifyFileList());
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: dirs,
		concat: {
			options: {
				separator: '\n',
				banner: banner,
				nonull: true
			},
			core: {
				src: ['<%= dirs.core %>/*.js'],
				dest: '<%= dirs.build %>/date-core.js',
			},
			basic: {
				src: ['<%= dirs.i18n %>/en-US.js', '<%= dirs.core %>/*.js' ],
				dest: '<%= dirs.build %>/development/date.js',
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true,
				preserveComments: false,
				banner: banner,
			},
			development: {
				options: {
					compress: false,
					mangle: false
				},
				files: buildUglifyFileList('dev')
			},
			production: {
				files: buildUglifyFileList()
			}
		},
		i18n: {
			core: {
				core: '<%= dirs.build %>/date-core.js',
				src: ['<%= dirs.i18n %>/*.js'],
				dest: '<%= dirs.build %>/development'   // destination *directory*, probably better than specifying same file names twice
			}
		},
		convert: {
			core: {
				core: '<%= dirs.i18n %>/en-US.js',
				src: ['<%= dirs.i18n %>/*.js'],
				dest: '<%= dirs.build %>/i18n'   // destination *directory*, probably better than specifying same file names twice
			}
		}
	});

	grunt.registerTask('default', ['concat:basic']);
	grunt.registerMultiTask('i18n', 'Wraps DateJS core with Internationalization info.', function() {
		var data = this.data,
			path = require('path'),
			dest = grunt.template.process(data.dest),
			files = grunt.file.expand(data.src),
			core = grunt.file.read(grunt.template.process(data.core)),
			sep = grunt.util.linefeed,
			banner_compiled = grunt.template.process(banner);

		files.forEach(function(f) {
			var p = dest + '/' + 'date-' + path.basename(f),
				contents = grunt.file.read(f);

			grunt.file.write(p, banner_compiled + sep + contents + sep + core );
			grunt.log.writeln('File "' + p + '" created.');
		});
		grunt.file.delete(dirs.build+'/date-core.js');
	});
	grunt.registerTask('build_dev', ['concat:core', 'concat:basic', 'i18n:core']);
	grunt.registerTask('build_prod', ['concat:core', 'concat:basic', 'i18n:core', 'uglify:production']);

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.registerMultiTask('convert', 'converts old DateJS format i18n into new format', function() {
	// 	var data = this.data,
	// 		path = require('path'),
	// 		dest = grunt.template.process(data.dest),
	// 		files = grunt.file.expand(data.src);
	// 	require('./'+data.core);
	// 	grunt.log.subhead('Loaded CultureStrings template file');
	// 	var base_data = Date.CultureInfo;
	// 	//     sep = grunt.util.linefeed,
	// 	//     banner_compiled = grunt.template.process(banner);
	// 	grunt.log.subhead('Processing i18n files...');
	// 	var banner = '/* \n' +
	// 		' * DateJS Culture String File\n' +
	// 		' * Country Code: <%= name %>\n' +
	// 		' * Name: <%= englishName %>\n' +
	// 		' * Format: "key" : "value"\n' +
	// 		' * Key is the en-US term, Value is the Key in the current language.\n' +
	// 		' */\n';
	// 	files.forEach(function(f) {
	// 		require('./'+f);
	// 		grunt.log.ok('Loaded: ' + path.basename(f).replace('.js', ''));
	// 		if (path.basename(f).replace('.js', '') === 'en-US') {
	// 			Date.CultureInfo = base_data;
	// 		}
	// 		var i, key, pattern,
	// 			name = Date.CultureInfo.name,
	// 			englishName = Date.CultureInfo.englishName,
	// 			output = {};
	// 		grunt.log.ok(name);
	// 		var banner_compiled = grunt.template.process(banner, {data:{name: name, englishName: englishName}});
	// 		for (var item in Date.CultureInfo) {
	// 			if (Date.CultureInfo.hasOwnProperty(item)) {
	// 				// grunt.log.writeln(Date.CultureInfo[item]);
	// 				if (item === 'name' || item === 'englishName' || item === 'nativeName') {
	// 					grunt.log.writeln(Date.CultureInfo[item]);
	// 					output[item] = Date.CultureInfo[item];
	// 				} else {
	// 					switch(item){
	// 						case 'dayNames':
	// 						case 'abbreviatedDayNames':
	// 						case 'shortestDayNames':
	// 						case 'monthNames':
	// 							for (i=0;i<Date.CultureInfo[item].length;i++) {
	// 								// grunt.log.writeln(base_data[item][i]);
	// 								output[base_data[item][i]] = Date.CultureInfo[item][i];
	// 							}
	// 							break;
	// 						case 'firstLetterDayNames':
	// 						case 'abbreviatedMonthNames':
	// 							var suffix = '_Abbr';
	// 							if (item === 'firstLetterDayNames') {
	// 								suffix = '_Initial';
	// 							}
	// 							for (i=0;i<Date.CultureInfo[item].length;i++) {
	// 								if (item === 'firstLetterDayNames') {
	// 									key = base_data[item][i]+'_'+base_data.abbreviatedDayNames[i]+suffix;
	// 								} else {
	// 									key = base_data.abbreviatedMonthNames[i]+suffix;
	// 								}
	// 								output[key] = Date.CultureInfo[item][i];
	// 							}
	// 							break;
	// 						case 'firstDayOfWeek':
	// 						case 'twoDigitYearMax':
	// 							output[item] = Date.CultureInfo[item];
	// 							break;
	// 						case 'formatPatterns':
	// 							for (pattern in Date.CultureInfo[item]) {
	// 								if (Date.CultureInfo[item].hasOwnProperty(pattern)) {
	// 									output[base_data[item][pattern]] = Date.CultureInfo[item][pattern];
	// 								}
	// 							}
	// 							break;
	// 						case 'regexPatterns':
	// 							for (pattern in Date.CultureInfo[item]) {
	// 								if (Date.CultureInfo[item].hasOwnProperty(pattern)) {
	// 									output[base_data[item][pattern].source] = Date.CultureInfo[item][pattern].source;
	// 								}
	// 							}
	// 							break;
	// 						case 'timezones':
	// 							for (var zone in base_data[item]) {
	// 								if (base_data[item].hasOwnProperty(zone)) {
	// 									output[zone] = base_data[item][zone];
	// 								}
	// 							}
	// 							break;
	// 						default:
	// 							if (typeof Date.CultureInfo[item] === 'string') {
	// 								output[base_data[item]] = Date.CultureInfo[item];
	// 							}
	// 							break;
	// 					}
						
	// 				}
	// 			}
	// 		}

	// 		// grunt.log.writeln(banner_compiled);
	// 		// grunt.log.writeln(JSON.stringify(output, null, '	'));
	// 	    var p = dest + '/' + path.basename(f);
	// 	    grunt.file.write(p, banner_compiled + 'Date.CultureStrings = ' + JSON.stringify(output, null, '	') + ';\n');
	// 	    grunt.log.writeln('File "' + p + '" converted.');
	// 	});
	// });
};