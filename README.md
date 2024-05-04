# https://jacob.millward.dev

This is the repository that hosts the content at https://jacob.millward.dev.
It is a site built with Hugo and the PaperModX theme. It's built using GitHub Actions and hosted on GitHub Pages.

## Development

### Prerequisites
- [Hugo](https://gohugo.io/getting-started/installing/)

Pull the repo, and be sure to initialize the theme submodule:
```bash
git submodule update --init --recursive
```

You can run the site locally with:
```bash
hugo serve
```

To create new a new post:
```bash
hugo new content /posts/<post-name>.md
```