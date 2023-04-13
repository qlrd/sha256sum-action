# Sha256Sum-Action

This action Get a gile as input and prepare its sha256sum.txt file.
## Inputs

## `working-directory`

**Required** The file's working directory that will be hashed.

## `file`

**Required** The filenamein your repo to be hashed.

## `ext`

The extension of sha256sum file. You can customize to `sha256sum.txt`, `sha256.txt` or anything you want

## Outputs

## `hash-file`

The path of hashed file.

## Example usage
```yaml
on:
  pull_request:
    branches:
      - main
jobs:
  sha256sum-action:
    runs-on: ubuntu-latest
    name: Test sha256sum-action
    steps:

      - name: Checkout
        uses: actions/checkout@v3

      - name: Sha256Sum Action
        uses: qlrd/sha256sum-action@v1.0.0
        id: hashing
        with:
          working-directory: ./test-data
          file: test.txt
          ext: 'sha256sum.txt'

      - name: Verify Hash
        run: cat ${{ steps.hashing.outputs.hash-file }} 
```
