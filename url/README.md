# URL

> System recipe, allowing the user to specify a url, instead of searching for it.

## Usage

There are just 2 scenarios, when you would like to use the recipe - you want to open a specific url directly, or you want to start page-hopping from a specific url.

Here's example for direct navigation:

```
url example.com⏎
```

Here's example for page-hopping from a specific url:

```
url example.com :l firstlink :l destination⏎
```

## Options

-None-

## Examples

```
u facebook.com
u twitter.com
u tsenkov.net :l contacts :l twitter
u https://pagehopapp.com
u ftp://server.somehost.com
```

## Results

If there is a query - 1 result with `text` and `address` fields equal to the query.

## License

[MIT](/LICENSE-MIT)