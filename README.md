# Manchu-API
This small repository contains the communication that MARKUS has with the Manchu-API.

### GET variables
use the `keyword` get variable to make the API look for something. Use the `output` get variable to force the output to
a format.

An example: look for keyword 'abk' and output in JSON:
```
http://localhost/manchu/manchu.html?keyword=abk&output=json
```

Another example: look for the keyword 'bla'. Since output is not defined, it will output HTML.
```
http://localhost/manchu/manchu.html?keyword=bla
```
