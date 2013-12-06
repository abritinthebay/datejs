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

var banner = '/* \n' +
			' * Name: <%= pkg.name %>\n' +
			' * Version: <%= pkg.version %>-<%= pkg.state %>-<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * Copyright: <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Original Project: 2008 <%= pkg.originator %>\n' +
			' * Licence: <%= pkg.license %>\n' +
			' * URL: <%= pkg.homepage %>\n' +
			' */';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: dirs,
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
		convert: {
			core: {
				core: '<%= dirs.i18n %>/en-US.js',
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
	grunt.registerTask('minify', ['closurecompiler:minify']);
	grunt.registerTask('build_dev', ['concat:core', 'concat:basic', 'i18n:core']);
	grunt.registerTask('build_prod', ['concat:core', 'concat:basic', 'i18n:core', 'minify']);
	// now set the default
	grunt.registerTask('default', ['build_dev']);
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-closurecompiler');
	grunt.loadNpmTasks('grunt-contrib-concat');
};