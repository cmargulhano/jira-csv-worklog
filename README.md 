# Utilitário de Worklog CSV do Jira

## Configuração:

### Configure seu arquivo .env local
Configure seu arquivo .env local de acordo com o arquivo de exemplo: `.env.example`.

#### api-token
    Gere seu api-token [aqui](https://id.atlassian.com/manage-profile/security/api-tokens).

    Veja mais em [documentos oficiais da Atlassian](https://support.atlassian.com/statuspage/docs/create-and-manage-api-keys/)

## Como executar:

### 1 - Edite seu arquivo local worklog.csv.

- Formato CSV:
```csv
issue;time;comment
```

- Exemplo abaixo:
```csv
TCGTRH-783;45m;Daily
TCGTRH-785;1h;RH - Reuniões, Apoio técnico e alinhamentos
```

> [!IMPORTANTE]
> Existe um bug não resolvido com horários parciais, como 1h30m. 
> Portanto, o .csv funciona com slots completos, como 150m ou 5h.

### 2 - Execute este código na sua linha de comando:

- Dia atual:
```bash
tsc; node ./src/index.js
```

- Dia específico:
```bash
tsc; node ./src/index.js 2024-05-15
```
