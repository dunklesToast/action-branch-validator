# GitHub JIRA Branch Validator

This action validates branch names for a specified convention.

## Usage

### Most basic usage

```yml
- uses: dunklesToast/action-branch-validator@v1
```

This will allow such branches:

```
feat/XD-1337
feat/XD-1337-some-more-info
fix/NO-TICKET
fix/NO-TICKET-just-a-small-bug-fix
```

Check the action.yml for all default scopes.

### Advanced usage

```yml
- uses: dunklesToast/action-branch-validator@v1
  with:
    scopes: mirage,dust,nuke,train
```

This will allow such braches:

```
mirage/XD-1337
dust/XD-1337-some-more-info
nuke/NO-TICKET
train/NO-TICKET-just-a-small-bug-fix
```

Check the action.yml for all default scopes.
