DateJS
======

An updated, actively maintained, fork of Date JS.

=== Background ===

Date JS was originally developed by Geoffrey McGill at Coolite (http://www.datejs.com/) but the last code check-in he performed was in Nov 4, 2008, and he hasn't been active at the sites Google Code svn repo since early 2010. Date JS is still one of the best Date libraries for Javascript but it needs some love, bug fixes and attention to bring it up-to-date.

This is what this fork plans to be. 

=== How to Install/Use ===

Just include the appropriate file from the build directory in your project. Files are named by their language and country code.

For example - date-en-US.js is suited for US English output. This is likely the most commonly used one.

=== Directory Structure ===

- *build*. Output of build process (to be checked in)
- *core*. Core DateJS methods.
- *i18n*. Internationalization files - culture and language specific parts for output (ie, days of the week, etc).
- *tests*. Tests for the code, useful for regression testing and completion coverage.