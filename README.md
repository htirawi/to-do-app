# TODO

## Summary


This is a [Next.js](https://nextjs.org/) project, to add, delete complete and list todos.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Specification

TODO app is a simple app for todos management.
it is build based on NEXT js and React and using Material UI.

### Structure

The todo files reside inside the project repository.

Here is an illustration:

```txt
.
├── TO-DO-APP
├── README.md
├── next.config.js
├── package.json
├── package-lock.json
└── src
    ├── constants.js
    ├── client
    ├── hooks
    └── lib
    └── pages
    └── recoil
    └── server
    └── services
    └── styles
    └── utils
```

Every todo markdown file starts with the `# TODO` header.

```markdown
# TODO

This text is not a task.

# DONE

A task can be in the following states:

* created
* completed
* deleted (removed from the document)

# DONE

- [x] Create GitHub organization todo-md
```
