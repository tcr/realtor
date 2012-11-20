# realtor

Check to see username availability across different websites.

Install as a command line tool:

```
$ npm install -g realtor
$ realtor my_username
```

Or as a module:

```
npm install realtor
```

```javascript
var realtor = require('realtor')
var username = 'my_username';
realtor.twitter(username, function (err, available) {
	console.log(username, available ? 'is' : 'is not', 'available.');
});
```

Available services:

* `twitter`
* `facebook`
* `gmail`
* `reddit`
* `hackernews`
* `github`
* `instagram`
* `pinterest`