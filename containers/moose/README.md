### Getting set up

```bash
npm install
```

### Running

```bash
npm start
```

Check out the graphql playground at http://localhost:4000/

### Queries

```gql
query GetBooks {
  books {
    title
  }
}
```

Returns

```json
{
  "data": {
    "books": [
      {
        "title": "Harry Potter and the Chamber of Secrets"
      },
      {
        "title": "Jurassic Park"
      }
    ]
  }
}
```