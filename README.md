# setup-datasubst

Sets up [datasubst](https://github.com/marcelocarlos/datasubst) to be used in GitHub actions workflows.

## Example

```yaml
jobs:
  example:
    name: Example
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - name: Setup datasubst
        uses: marcelocarlos/setup-datasubst@v1
        with:
          version: v0.7.0

      - name: Run databsubst
        run: datasubst --version
```
