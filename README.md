# diagnostics_parser


## Make sure you have python installed. 

## By default, the diagnostics parser will take a debug.log file in the same directory, print basic information and errors to the console, and output a debug_parsed.json file including all of the received logs.

## Run the following to see the list of arguments you can provide to change the default behavior:
`python diagnostics_parser.py --help`



## Examples:

### Situation 1: 
#### I have a `debug.log` file next to my `diagnostics_parser.py` file, and want to see some basic info in the console, while outputting a `debug_parsed.json` file in the same folder.

`python diagnostics_parser.py`


### Situation 2:
#### Let's do that again, but I don't want to log to the console

`python diagnostics_parser.py --noconsole`


### Situation 3:
#### Alright, what if my log file is at a different path?

`python diagnostics_parser.py --logpath ./debug_junk.log`


### Situation 4:
#### What if I want to output to a different path?

`python diagnostics_parser.py --outpath ./whatever.json`


### Situation 5:
#### What if my log file has way too many events in it? 

`python diagnostics_parser.py --logpath ./too_many_events.log --noeventlogs`


### Situation 6:
#### What if my log file has way too many external events in it, but I want to keep the normal events? 

`python diagnostics_parser.py --logpath ./too_many_external_events.log --noexternallogs`


### Situation 7:
#### I see that you don't include the sent runtime logs by default. What if I want those?

`python diagnostics_parser.py --includesentlogs`


### Situation 8:
#### I don't like that there's log doubling with render frame and entity logs. What if I want to get rid of the logs grouped by render frame ID?

`python diagnostics_parser.py --norenderlogs`


### Situation 9:
#### What if I want to get rid of the logs grouped by entity?

`python diagnostics_parser.py --noentitylogs`


### Situation 10:
#### What if I'm in Mac and want to have some fun with color output?

`python diagnostics_parser_mac_color.py`

