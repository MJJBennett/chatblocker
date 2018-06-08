In order to configure which words/combinations/users/etc you'd like to block, rename this file to "conf.json" and remove all explanatory strings and markdown, leaving just the JSON structure.

Example JSON:

```JSON
{
    "block_if_contains": [
        "word/phrase, message will be removed if it contains in any place this word/phrase",
        "another word or phrase"
    ],
    "block_if_user": [
        "exact username you want to remove messages from",
        "another username"
    ]
}
```
