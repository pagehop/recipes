# HackerNews

> Recipe for browsing through the Hacker News (news.ycombinator.com).

## Usage

After opening Pagehop write the minimal necessary to see HackerNews on top of resulting recipes and press space. This will show you the posts as ordered on the news.ycombinator.com page (depending on "Number of results" in the settings it might pull more than just the first-page results).

```
hackern[space]
```

You can make an offline fuzzy search on the pulled results. To do this, after you pressed space (look up) simply write your query.

```
hackern [offline search query]
```

Use this same technique when you specify one of the recipe options, too. It works with them, just as well.

## Options

### :d (discussion)

Whether you are browsing through the main HackerNews results, comments, questions or news, you can change the destination of the results - when you choose a result to go to its discussion on hacker news, instead of the original address of the result. You do this by using the :d option.

So, for example, you can check the discussions on some of the main news:

```
hackern :d [offline search query]
```

Or, you could check the discussions on some of the newest posts:

```
hackern :n :d [offline search query]
```

### :n (new)

If you want to see the newest posts (not comments) you can use the :n recipe option.

```
hackern [:d] :n [offline search query]
```

### :s (show)

If you want to see the newest Show HN: posts, use the :s option.

```
hackern [:d] :s [offline search query]
```

### :c (comments)

If you want to see the comments on discussions, use the :c option. :d will point to the thread root (the discussion page), while without it, the selected result point to the comment.

```
hackern [:d] :c [offline search query]
```

### :ask

If you want to see the current most popular questions ("Ask HN"). :d is pointless here - will not change address, because the original address **is** the actual discussion.

```
hackern :ask [offline search query]
```

### :j (jobs)

To view the job posts by YCombinator companies. These posts, don't have discussions - using :d will not have any effect.

```
hackern :j [offline search query]
```

## Examples

```
hackern[space]
hackern js
hackern :d
hackern :a
hackern :n :d
hackern :d :n
hackern :c
hackern :c :d
hackern :c :d crazy technology
```

## Results

Depending on options. Check the options section.