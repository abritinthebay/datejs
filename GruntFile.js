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

var buildUglifyFileList = function () {
	var files = getI18NFiles();
	var output = {};
	files.map(function(item){
		var file_core_name = 'date-' + item.replace('.js', '');
		var dest = dirs.build + '/production/' + file_core_name.toLowerCase() + '.min.js';
		output[dest] = [dirs.build + '/development/' + file_core_name.toLowerCase() + '.js'];
		return dest;
	});
	output[dirs.build + '/production/' + 'date.min.js'] = [dirs.build + '/development/' + 'date.js'];
	return output;
};

var banner = '/* \n' +
			' * Name: <%= pkg.name %>\n' +
			' * Version: <%= pkg.version %>\n' +
			' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * Copyright: <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
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
				separator: '\n'
			},
			core: {
				nonull: true,
				src: ['<%= dirs.core %>/*.js'],
				dest: '<%= dirs.build %>/date-core.js'
			},
			basic: {
				nonull: true,
				src: ['<%= dirs.i18n %>/en-US.js', '<%= dirs.core %>/*.js' ],
				dest: '<%= dirs.build %>/development/date.js'
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true,
				preserveComments: false,
				banner: banner
			},
			developement: {
				compress: false,
				mangle: false,
				files: buildUglifyFileList()
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
	});
	grunt.registerTask('build_dev', ['concat:core', 'concat:basic', 'i18n:core', 'uglify:development']);
	grunt.registerTask('build_prod', ['concat:core', 'concat:basic', 'i18n:core', 'uglify:production']);

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Default task(s).
	// grunt.registerTask('default', ['uglify']);
};