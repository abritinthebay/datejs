# DateJS: Evolved
The Javascript Date Library

## What is it?
DateJS extends the built-in Javascript Date object to add much better parsing, internationalization support, and all the functions and syntactic sugar you could wish for.
### Background 
Date JS was started by Geoffrey McGill in 2007, he abandoned it on May 13th 2008; leaving the Google Code repository stagnant and with many bugs unresolved. 

This fork was started improve and maintain DateJS. To keep what is still the most full featured JavaScript Date library alive, maintained, and improved.

Currently we're on track towards a 1.0 release - having fixed almost all the exist bugs and added several new features, improved parsing, and many other changes.

### How to Install/Use

Just include the appropriate file from the build directory in your project. Files are named by their language and country code.

For example - date-en-US.js is suited for US English output. This is likely the most commonly used one.

## File Structure

* `build` Output from the Grunt powered build process
    * `development` Non-minfied files with full comments. Suitable for development enviroments.
    * `production` Fully minified (by Google's Closure Compiler) files suitable for production.  
*  `src` All the source files used to build the final files.
    * `core` The main DateJS source files.
    * `i18n` Internationalization files. Language specifics (days of the week, regex formats,etc). Organized by IETF language tag (eg - en-US, etc).
* `specs` Unit Tests written in Jasmine. Code coverage is calculated by BlanketJS. 
* `tests` Orginal unit tests for 2008 project. *Deprecated*.  
