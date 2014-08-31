# NPMSearch

> Recipe for searching NodeJS's package manager's (npm) archive, through npmsearch.com.

## Usage

After opening Pagehop write the minimal necessary to see NPMSearch on top of resulting recipes, press space and write your query. By default results navigate to the package's page in **npmjs.org**.

```
npm [:h] [search query]
```

## Options

### :h (homepage)

Instead of navigating to the page on npmjs.org, you can go to the **homepage of the project** (usually the github readme, but sometimes a separate website for the project) by specifying the :h recipe option.

## Examples

```
npm redis
npm :h binary
```

## Results

Point to npmjs.org pages for the packages they represent. If :h is used - results point to the homepage of the project.