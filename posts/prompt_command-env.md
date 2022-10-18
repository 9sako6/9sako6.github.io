---
title: "Display the git branch name at the prompt and follows branch switching"
description: "The `PROMPT_COMMAND` variable is evaluated just before the prompt is displayed, so it is useful for dynamically displaying a branch name at the prompt."
topics: ["bash"]
published: true
eyecatch: "/images/example-prompt-with-git-branch.webp"
date: "2022-10-19T01:46:23.190+09:00"
lang: "en"
---

The `PROMPT_COMMAND` variable is evaluated just before the prompt is displayed, so it is useful for dynamically displaying a branch name at the prompt.

In my `.bashrc`, I use `PROMPT_COMMAND` to display the branch name in the prompt as follows.

```bash
set_prompt() {
  PS1="\[\e]0;\u@\h: \w\a\]\[\033[01;32m\]\u\[\033[00m\]@\[\033[01;34m\]\w\[\033[00m\]($(git branch --show-current 2>/dev/null))\n$ "
}

PROMPT_COMMAND=set_prompt
```

You can display the current branch name following a branch switch with `git switch` or `git checkout` as follows.

![example of the prompt](/images/example-prompt-with-git-branch.webp)

If `PROMPT_COMMAND` is not set, switching branches will leave the previous branch visible at the prompt.
Without `PROMPT_COMMAND`, we will have to do `source ~/.bashrc` manually or use git's `post-checkout` hook.

# References

1. [Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-PROMPT_005fCOMMAND)
2. https://stackoverflow.com/questions/3058325/what-is-the-difference-between-ps1-and-prompt-command
