# DateJS: Evolved
The Javascript Date Library  
[![Build Status](https://travis-ci.org/abritinthebay/datejs.png?branch=master)](https://travis-ci.org/abritinthebay/datejs)
## What is it?
DateJS extends the built-in Javascript Date object to add much better parsing, internationalization support, and all the functions and syntactic sugar you could wish for.
### Background 
Date JS was started by Geoffrey McGill in 2007, he abandoned it on May 13th 2008; leaving the Google Code repository stagnant and with many bugs unresolved. 

This fork was started improve and maintain DateJS. To keep what is still the most full featured JavaScript Date library alive, maintained, and improved. Currently we're on track towards a 1.0 release - having fixed almost all the exist bugs and added several new features, improved parsing, and many other changes.

### How to Install/Use
DateJS supports running either your regular web browser as a client library or Node.js.

#### Node.js
Installaltion is as easy as running:

    npm install datejs

#### Web Browser 
 * For production enviroments include [the production ready minified file from the Build directory](https://github.com/abritinthebay/datejs/blob/master/build/production/date.min.js) on your page. 
 * For debugging (eg, in development) include [the unminfied and fully commented version](https://github.com/abritinthebay/datejs/blob/master/build/development/date.js)

Support for the Bower package manager is on the roadmap, but is not implemented yet.

#### International Language Versions
In Node.js you can just call `Date.i18n.setLanguage` with the IETF appropriate code (e.g. "de-DE", or "es-MX") and DateJS will load the file automatically. For the browser DateJS has langauge support in one of two ways:
 1. Download the appropriate file from [the Build directory](https://github.com/abritinthebay/datejs/blob/master/build/). Files are named after the IETF code the load (i.e. `date-es-MX.js` loads Mexican Spanish).
 2. Set `Date.Config.i18n` to the location of [the internationalization files](https://github.com/abritinthebay/datejs/blob/master/src/i18n/) on your server and DateJS will dynamically load the files by script element insersion. 

DateJS will always support loading US English via `Date.i18n.setLanguage("en-US")` no matter what other language is specifically loaded. So you can always support both your localization and the English speaking world.

## File Structure
* `build` Output from the Grunt powered build process
    * `development` Non-minfied files with full comments. Suitable for development enviroments.
    * `production` Fully minified (by Google's Closure Compiler) files suitable for production.  
*  `src` All the source files used to build the final files.
    * `core` The main DateJS source files.
    * `i18n` Internationalization files. Language specifics (days of the week, regex formats,etc). Organized by IETF language tag (eg - en-US, etc).
* `specs` Unit Tests written using [Jasmine](http://pivotal.github.io/jasmine/). Code coverage is calculated by [BlanketJS](http://blanketjs.org/). 
* `tests` Orginal unit tests for 2008 project. *Deprecated*.  
