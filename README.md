# realtor

Check to see username availability across different websites.

Install as a command line tool:

```
$ npm install -g realtor
$ realtor my_username
instagram    [TAKEN]  http://instagram.com/my_username
gmail        [TAKEN]  https://www.google.com/accounts/CheckAvailability?Email=my_username
facebook     [UNUSED] https://www.facebook.com/my_username
reddit       [TAKEN]  http://www.reddit.com/user/my_username
pinterest    [UNUSED] http://pinterest.com/my_username/
twitter      [TAKEN]  https://twitter.com/my_username
github       [UNUSED] https://github.com/my_username
hackernews   [UNUSED] https://news.ycombinator.com/user?id=my_username
```

Or as a module:

```
npm install realtor
```

```javascript
var realtor = require('realtor')
var username = 'my_username';
realtor.twitter(username, function (err, available, url) {
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