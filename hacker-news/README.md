# HackerNews

> Recipe for browsing through the Hacker News (news.ycombinator.com).

## Usage

After opening Pagehop write the minimal necessary to select HackerNews and press space. This will show you the posts as ordered on the news.ycombinator.com page (depending on "Number of results" in the settings it might pull more than just the first-page results).

```
hack[space]
```

You can make an offline fuzzy search on the pulled results. To do this, after you pressed space (look up) simply write your query.

```
hack [offline search query]
```

Use this same technique when you specify one of the recipe options, too. It works with them, just as well.

## Options

### :d (discussion)

Whether you are browsing through the main HackerNews results or Show HN: posts (:s), you can change the destination of the results - when you choose a result to go to its discussion on hacker news, instead of the original address of the result. You do this by using the :d option.

So, for example, you can check the discussions on some of the main news:

```
hack :d [offline search query]
```

Or, you could check the discussions on some of the Show HN: posts:

```
hack :s :d [offline search query]
```

### :s (show)

If you want to see the newest Show HN: posts, use the :s option.

```
hack [:d] :s [offline search query]
```

### :ask

If you want to see the current most popular questions (Ask HN: and Poll:). :d is pointless here - will not change address, because the original address **is** the actual discussion.

```
hack :ask [offline search query]
```

### :j (jobs)

To view the job posts by YCombinator companies. These posts, don't have discussions - using :d will not have any effect.

```
hack :j [offline search query]
```

## Examples

```
hack[space]
hack :d
hack :s
hack :ask
hack :j
hack :s :d
hack new platform
hack :d ssl noodle
hack :ask teh question
hack :s platform
hack :s :d teh codez
hack :j first engineer
```

## Results

Depending on options. Check the options section.