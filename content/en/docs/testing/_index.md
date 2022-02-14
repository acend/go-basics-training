---
title: "Testing"
weight: 15
---

## Title 1

{{% alert title="Note" color="primary" %}}
Sample Note
{{% /alert %}}

Sample code block:
```bash
echo "Hello World!"
```

{{% onlyWhen variant1 %}}
This is only rendered when `enabledModule` in `config.toml` contains `variant1`.
{{% /onlyWhen %}}

{{% onlyWhen variant2 %}}
This is only rendered when `enabledModule` in `config.toml` contains `variant2`.
{{% /onlyWhen %}}

{{% onlyWhen variant1 variant2 %}}
This is only rendered when `enabledModule` in `config.toml` contains `variant1` or `variant2`.
{{% /onlyWhen %}}

{{% onlyWhen variant9 %}}
This is only rendered when `enabledModule` in `config.toml` contains `variant9`.
{{% /onlyWhen %}}

{{% onlyWhenNot variant1 %}}
This is only rendered when `enabledModule` in `config.toml` **does not** contain `variant1`.
{{% /onlyWhen %}}

{{% onlyWhenNot variant2 %}}
This is only rendered when `enabledModule` in `config.toml` **does not** contain `variant2`.
{{% /onlyWhen %}}

{{% onlyWhenNot variant1 variant2 %}}
This is only rendered when `enabledModule` in `config.toml` **does not** contain `variant1` **nor** `variant2`.
{{% /onlyWhen %}}

{{% onlyWhenNot variant9 %}}
This is only rendered when `enabledModule` in `config.toml` **does not** contain `variant9`.
{{% /onlyWhen %}}


## Title 2


```yaml
foo: bar
```


## {{%task%}} Fix Deployment


```yaml
foo: bar
```


## {{%task%}} Fix Release


```yaml
foo: bar
```


## {{%task%}} Fix Release again


```yaml
foo: bar
```


## {{%task%}} Fix Release again and again


```yaml
foo: bart
```
