# Vercel AI Action Configuration

This repository includes examples for using the [Vercel AI GitHub Action](https://github.com/marketplace/actions/vercel-ai) to generate structured AI output during CI and to call OpenAI models from application code.

## GitHub Actions workflow

The workflow defined in `.github/workflows/structured-data-generation-example.yml` runs on each push to the `main` branch and performs the following steps:

1. Calls `vercel/ai-action@v2` with a prompt asking for a lasagna recipe.
2. Validates the response against a JSON schema to ensure a predictable shape for downstream steps.
3. Exposes the validated JSON so subsequent steps can parse and use the recipe fields.

Before running this workflow, create a repository secret named `AI_GATEWAY_API_KEY` that contains your AI Gateway key. Add or rotate the secret by navigating to **Repository Settings → Secrets and variables → Actions → New repository secret**.

When you need to rotate the credential, visit the Vercel AI key management page for this project:

<https://vercel.com/bill-hunters-projects/~/ai/api-keys>

Create a new key there and update the `AI_GATEWAY_API_KEY` secret in GitHub.

## Deployment workflow integration

The main deployment workflow (`.github/workflows/deploy.yml`) now includes a `vercel/ai-action@v2.1.0` step that summarizes the
changes included in the commit being deployed. The step uses the same `AI_GATEWAY_API_KEY` secret and requests the
`openai/gpt-4.1-mini` model to produce a short deployment note that is printed to the workflow logs.

## Using OpenAI models in code

To call OpenAI models from application code with streaming responses, use the `streamText` helper from the `ai` package:

```ts
import { streamText } from 'ai'

const result = streamText({
  model: 'openai/gpt-4.1-mini',
  prompt: 'Why is the sky blue?'
})
```

This example matches the configuration used by the workflow and demonstrates the expected model identifier.
