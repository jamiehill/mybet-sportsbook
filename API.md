Current Apis
============

1. Return the currently available (matrix driven) sports.
---------------------------------------------------------

https://sports.qacore.pyr/sportsbook/v1/api/getRegionalSports?locale=en-gb

```
{
  "SportTypes": {
    "sports": [
      {
        "code": "SOCCER",
        "nodeId": 166661
      },
      {
        "code": "TENNIS",
        "nodeId": 166662
      }
    ]
  }
}
```

**Proposed**

Make more json like

```
{
	"SOCCER": {
		"nodeId": 166661
	},
	"TIDDLY_WINKS": {
		"nodeId": 123456
	}
}
```

Parameterize to return:

* individual sports, if a csv of sports is provided,
* all sports if no csv provided,
* and default sport (initial sport as defined in the matrix) if *someToken* if provided


2. Returns Market Groups
------------------------

https://sports.qacore.pyr/sportsbook/v1/api/getSportDisplayTemplate?sport=SOCCER&channelId=6&locale=en-gb

```
{
  "SportDisplayTemplate": {
    "markettemplate": [
      {
        "groups": [
          {
            "code": "Match",
            "displayOrder": 1
          }
        ],
        "type": "TMTG",
        "displayOrder": 1,
        "expandedByDefault": true,
        "headlineMarket": false
      }
}
```

**Proposed**

Returns a market template, for every market type, are there are millions.  Would be better to have just a group type, with pertinent market types/other props underneath.

Ie:
```
{
	"Match": {
	  "displayOrder": 1,
	  "expandedByDefault": true,
	  "headlineMarket": false,
	  "types": [
	  	"TMTG",
	  	"MRES",
	  	"ETC",
	  	"ETC"
		]
	},
	"Handicap": {
	  "displayOrder": 2,
	  "expandedByDefault": true,
	  "headlineMarket": false,
	  "types": [
		"BLAH",
		"BLAH",
		"BLAH"
		]
	},
}
```

3. Get available markets
------------------------

https://sports.qacore.pyr/sportsbook/v1/api/getAvailableMarketsForSports?sports=SOCCER&locale=en-ie

Returns a massive blob of markets types:

```
{
  "Attributes": {
    "attrib": [
      {
        "value": "LGSC=Last Goalscorer,FTB_10=,MOBTS=Match Result and Both Teams to Score,DBLC.IT="
        "key": "SOCCER"
      }
    ]
  }
}
```

**Proposed**

Just clean up the syntax a little and make more json-like ie.

```
{
  "SOCCER": [
		{"LGSC": "Last Goalscorer"},
		{"FTB_10":"Blah blah"},
		{"MOBTS":"Match Result and Both Teams to Score"}
	],
  "TIDDLY_WINKS": [
		{"LGSC": "Last Goalscorer"},
		{"FTB_10":"Blah blah"},
		{"MOBTS":"Match Result and Both Teams to Score"}
	],
}
```

4. Get key markets
------------------

Returns the key markets for a parameterized list of sports

```
{
	"Attributes":{
		"attrib":[
			{
				"value":"MRES,OVUN,H1RS,DNOB,OUH1",
				"key":"SOCCER"
			}
		]
	}
}
```

**proposed**

Just clean up the syntax a little and make more json-like ie.

```
{
  "SOCCER": ["MRES","OVUN","H1RS","DNOB","OUH1"],
  "TIDDLY_WINKS": ["MRES","OVUN","H1RS","DNOB","OUH1"],
}
```

Main Proposition
================

Consolidate all of the above into one api.  A new api, to combine the above.  For example:

Params:

sports - Undefined return all, cvs list returns those sports, and INITIAL returns matrix initial sport
markets - Boolean true or false.  Default true.  Returns markets for that sport
keyMarkets - Boolean true or false.  Default true.  Returns keyMarkets for that sport
groups - Boolean true or false.  Default true.  Returns market groups for that sport


getSportData?sports=SOCCER&&markets=true&&keyMarkets=true&&groups=true

ie:

```
{
	"SOCCER": {
		"nodeId": 166661,
		"markets": [
			{"LGSC": "Last Goalscorer"},
			{"FTB_10":"Blah blah"},
			{"MOBTS":"Match Result and Both Teams to Score"}
		]
		"keyMarkets": ["MRES","OVUN","H1RS","DNOB","OUH1"]
		"groups": {
			"Match": {
			  "displayOrder": 1,
			  "expandedByDefault": true,
			  "headlineMarket": false,
			  "types": [
				"TMTG",
				"MRES",
				"ETC",
				"ETC"
				]
			},
			"Handicap": {
			  "displayOrder": 2,
			  "expandedByDefault": true,
			  "headlineMarket": false,
			  "types": [
				"BLAH",
				"BLAH",
				"BLAH"
				]
			}
		}
	}
}
```
