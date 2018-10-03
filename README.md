@momsfriendlydevco/readable
===========================
Utility formatters to take raw data and present it in a readable format.


Features:

* No dependencies
* Tiny footprint
* Customizable time / size units
* Code is as small as possible and easily copy/pasteable


API
===

readable.defaults
-----------------
Obejct containing all the default settings. These are deep merged with any setting object given to a formatter.


readable.relativeTime(timestamp, [options])
-------------------------------------------
Return a human readable relative time distance.


```javascript
readable.relativeTime(new Date(Date.now() - 50)) //= "Just now"
readable.relativeTime(new Date(Date.now() - 50), {units: {milliseconds: true}}) //= "50ms"
readable.relativeTime(Date.now() - 5000) //= "5s"
readable.relativeTime(new Date(Date.now() - 60000)) //= "1m"
readable.relativeTime(new Date(Date.now() - 65000)) //= "1m5s"
readable.relativeTime(moment().subtract(1, 'w').subtract(2, 'd')) //= "9D"
```

This function can take the following options:

| Option                | Type                   | Default      | Description                                                                                                                                                              |
|-----------------------|------------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `units`               | `Object`               | (See code)   | A list of units to output, each is named in the plural with a boolean indicating if it should be reported e.g. `{units: {years: true}}` to enable years as a usable unit |
| `formatters`          | `Object`               | (See code)   | A list of formatters for each named unit, each should be a function taking a single value. e.g. `{formatters: {days: v => \`${v} days\`}}`                               |
| `formatters.fallback` | `Function` or `String` | `"Just now"` | The fallback formatter to use, if it is a string its used as is, if it is a function it is called with the value                                                         |
| `formatters.input`    | `Function`             | (See code)   | Input mangler, by defaults this converts dates and Moment objects to a millisecond offset from now                                                                       |
| `formatters.combiner` | `Function`             | (See code)   | Function used to combine all compiled units, by default this joins everything into a string with no spacing and truncates any training spaces                            |
| `values`              | `Object`               | (See code)   | A list of unit values to work with if the unit is enabled, each is the plural key of the measure with the number of milliseconds within the unit as the key              |


readable.fileSize(bytes, [options])
-----------------------------------
Return a human readable file size.

```javascript
readable.fileSize(1024) //= "1kb"
readable.fileSize(1536) //= "1.5kb"
readable.fileSize(1048576) //= "1mb"
readable.fileSize(1073741824) //= "1tb"
readable.fileSize(1288490188) //= "1.2tb"
```

This function can take the following options:

| Option                  | Type                     | Default        | Description                                                                                                                                                                |
|-------------------------|--------------------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `decimals`              | `number`                 | `1`            | Decimal places to format the number into                                                                                                                                   |
| `decimalsAbsolute`      | `boolean`                | `true`         | If true the decimals will be clipped entirely if the number is exactly correct (e.g. if the input is `1024` the output is `1kb` not `1.0kb`)                               |
| `units`                 | `Object`                 | (See code)     | A list of units to output, each is named in the plural with a boolean indicating if it should be reported e.g. `{units: {years: true}}` to enable years as a usable unit   |
| `formatters`            | `Object`                 | (See code)     | A list of formatters for each named unit, each should be a function taking a single value. e.g. `{formatters: {days: v => \`${v} days\`}}`                                 |
| `formatters.fallback`   | `Function` or `String`   | `""`           | The fallback formatter to use, if it is a string its used as is, if it is a function it is called with the value                                                           |
| `values`                | `Object`                 | (See code)     | A list of unit values to work with if the unit is enabled, each is the plural key of the measure with the number of milliseconds within the unit as the key                |
