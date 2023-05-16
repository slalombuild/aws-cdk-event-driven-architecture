# Installation
> `npm install --save @types/git-branch`

# Summary
This package contains type definitions for git-branch (https://github.com/jonschlinkert/git-branch).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/git-branch.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/git-branch/index.d.ts)
````ts
// Type definitions for git-branch 2.0
// Project: https://github.com/jonschlinkert/git-branch
// Definitions by: DefinitelyTyped <https://github.com/DefinitelyTyped>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

export = GitBranch;

declare function GitBranch(cwd?: string): Promise<string>;
declare function GitBranch(cwd?: string, callback?: (err: null | string, name: string) => void): void;
declare function GitBranch(callback: (err: null | string, name: string) => void): void;

declare namespace GitBranch {
  function sync(cwd?: string): string;
}

````

### Additional Details
 * Last updated: Thu, 23 Dec 2021 23:34:41 GMT
 * Dependencies: none
 * Global values: none

# Credits
These definitions were written by [DefinitelyTyped](https://github.com/DefinitelyTyped).
