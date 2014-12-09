# System

> System recipe. It allows listing of recipes & tools and check for a newer version of Pagehop.
Replaces the previously used AllRecipes and AllTools.

## Usage

When you want to check your arsenal of available recipes.

```
sys :r [recipe-id]
```

If you want to see what tools are at your disposal.

```
sys :t [tool-id]
```

## Options

### :r List all recipes

### :t List all tools

### :u Check for an update

## Examples

```
sys :r
sys :r hack
sys :t
sys :t addr
sys :u
```

## Results

Every result, when listing recipes or tools, points (navigates) to the documentation of the recipe/tool it represents. When searching for an update - results point to binaries for download.