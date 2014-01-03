// GruntFile for building the final compiled files from the core.
// Run using NodeJS and the Grunt module
var fs = require('fs');
var dirs = {
	core: 'core',
	i18n: 'core/i18n',
	build: 'build'
};
var getI18NFiles = function () {
	return fs.readdirSync(dirs.i18n);
};

var buildMinifyFileList = function (dev) {
	var output_path = dev ? 'development' : 'production';
	var output_ext = dev ? '.' : '.min.';
	var files = getI18NFiles();
	var output = {};
	files.map(function(item){
		var file_core_name = 'date-' + item.replace('.js', '');
		var dest = dirs.build + '/'+output_path+'/' + file_core_name + output_ext + 'js';
		output[dest] = [dirs.build + '/development/' + file_core_name + '.js'];
		return dest;
	});
	output[dirs.build + '/'+output_path+'/' + 'date'+output_ext+'js'] = [dirs.build + '/development/' + 'date.js'];
	return output;
};

var banner = '/** \n' +
			' * @overview <%= pkg.name %>\n' +
			' * @version <%= pkg.version %>-<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
			' * @copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
			' * @license <%= pkg.license %>\n' +
			' * @homepage <%= pkg.homepage %>\n' +
			' */';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: dirs,
		build_dev: {
			description: 'Builds files designed for easy debugging on dev enviroments (non-minified)'
		},
		build_prod: {
			description: 'Builds production ready files (minified)'
		},
		closurecompiler: {
			minify: {
				files: buildMinifyFileList(),
				options: {
					'compilation_level': 'SIMPLE_OPTIMIZATIONS',
					'max_processes': 5,
					'banner': banner
				}
			}
		},
		concat: {
			options: {
				separator: '\n',
				banner: banner,
				nonull: true
			},
			core: {
				src: [
					'<%= dirs.core %>/i18n.js',
					'<%= dirs.core %>/core.js',
					'<%= dirs.core %>/parser.js',
					'<%= dirs.core %>/sugarpak.js',
					'<%= dirs.core %>/extras.js',
					'<%= dirs.core %>/time.js'
				],
				dest: '<%= dirs.build %>/date-core.js'
			},
			basic: {
				src: [
					'<%= dirs.core %>/i18n.js',
					'<%= dirs.core %>/core.js',
					'<%= dirs.core %>/parser.js',
					'<%= dirs.core %>/sugarpak.js',
					'<%= dirs.core %>/extras.js',
					'<%= dirs.core %>/time.js'
				],
				dest: '<%= dirs.build %>/development/date.js'
			}
		},
		i18n: {
			core: {
				core: '<%= dirs.build %>/date-core.js',
				src: ['<%= dirs.i18n %>/*.js'],
				dest: '<%= dirs.build %>/development'   // destination *directory*, probably better than specifying same file names twice
			}
		},
		convertit: {
			core: {
				src: ['<%= dirs.i18n %>/*.js'],
				dest: '<%= dirs.build %>/i18n'   // destination *directory*, probably better than specifying same file names twice
			}
		}
	});

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
	grunt.registerMultiTask('build_dev', 'Builds compiled, non-minfied, files for development enviroments', function() {
		grunt.task.run(['concat:core', 'concat:basic', 'i18n:core']);
	});
	grunt.registerMultiTask('build_prod', 'Rebuilds dev and minifies files for production enviroments', function() {
		grunt.task.run(['concat:core', 'concat:basic', 'i18n:core', 'closurecompiler:minify']);
	});

	grunt.registerMultiTask('convertit', 'converts i18n regex into new format', function() {
				var data = this.data,
						path = require('path'),
						dest = grunt.template.process(data.dest),
						files = grunt.file.expand(data.src);

				grunt.log.subhead('Processing i18n files...');
				var banner = '/* \n' +
						' * DateJS Culture String File\n' +
						' * Country Code: <%= name %>\n' +
						' * Name: <%= englishName %>\n' +
						' * Format: "key" : "value"\n' +
						' * Key is the en-US term, Value is the Key in the current language.\n' +
						' */\n';
				grunt.log.writeln(data.src);
				files.forEach(function(f) {
						require('./'+f);
						grunt.log.ok('Loaded: ' + path.basename(f).replace('.js', ''));
						var name = Date.CultureStrings.name,
							englishName = Date.CultureStrings.englishName,
							output = {},
							key;
						
						var banner_compiled = grunt.template.process(banner, {data:{name: name, englishName: englishName}});
						for (var item in Date.CultureStrings) {
								if (Date.CultureStrings.hasOwnProperty(item)) {
									// grunt.log.ok(item);
										switch (item) {
											case '^jan(uary)?':
												key = '/jan(uary)?/';
											break;
											case '^feb(ruary)?':
												key = '/feb(ruary)?/';
											break;
											case '^mar(ch)?':
												key = '/mar(ch)?/';
											break;
											case '^apr(il)?':
												key = '/apr(il)?/';
											break;
											case '^may':
												key = '/may/';
											break;
											case '^jun(e)?':
												key = '/jun(e)?/';
											break;
											case '^jul(y)?':
												key = '/jul(y)?/';
											break;
											case '^aug(ust)?':
												key = '/aug(ust)?/';
											break;
											case '^sep(t(ember)?)?':
												key = '/sep(t(ember)?)?/';
											break;
											case '^oct(ober)?':
												key = '/oct(ober)?/';
											break;
											case '^nov(ember)?':
												key = '/nov(ember)?/';
											break;
											case '^dec(ember)?':
												key = '/dec(ember)?/';
											break;
										}
									if (key) {
										if (Date.CultureStrings[item].charAt(0) === '^') {
											item = Date.CultureStrings[item].slice(1);
										}
										output[key] = item;
										grunt.log.ok('changed '+key+' has content '+item);
										key = undefined;

									} else {
										if (item.charAt(0) === '^') {
											output['/'+item+'/'] = Date.CultureStrings[item];
										} else {
											output[item] = Date.CultureStrings[item];
										}
									}
								}
						}

					grunt.log.writeln(banner_compiled);
					// grunt.log.writeln(JSON.stringify(output, null, '        '));
					var p = dest + '/' + path.basename(f);
					var json = JSON.stringify(output, null, '        ');
					grunt.file.write(p, banner_compiled + 'Date.CultureStrings = Date.CultureStrings || {};\nDate.CultureStrings["'+name+'"] = ' + json + ';\nDate.CultureStrings.lang = "'+name+'";\n');
					grunt.log.writeln('File "' + p + '" converted.');
				});
	});



	// now set the default
	grunt.registerTask('default', ['build_dev']);
	// Load the plugin that provides the "minify" task.
	grunt.loadNpmTasks('grunt-closurecompiler');
	grunt.loadNpmTasks('grunt-contrib-concat');
};