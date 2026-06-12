const e=`# Get started with services

Deploy your machine learning applications in production using [Ray Serve](https://docs.ray.io/en/latest/serve/index.html), an open-source, distributed serving library for building online inference APIs.

---

Deploy your first service with the following instructions.

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Serving | [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) | HTTP deployment with a single endpoint |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## 1. Install the Anyscale CLI

\`\`\` bash
pip install -U anyscale
anyscale login
\`\`\`

## 2. Deploy a service

Clone the example from GitHub.

\`\`\` bash
git clone https://github.com/anyscale/examples.git
cd examples/service_hello_world
\`\`\`

The code for an endpoint that says "hello" is in [main.py](https://github.com/anyscale/examples/blob/main/service_hello_world/main.py).

Also take a look at \`service.yaml\`. This file specifies the container image, compute resources, script entrypoint, and a few other fields.

Deploy the service:

\`\`\` bash
anyscale service deploy -f ./service.yaml
\`\`\`

## 3. Query the service

Once the service is running, query it as follows:

\`\`\`python
import requests

# The "anyscale service deploy" script outputs a line that looks like
#
#     curl -H "Authorization: Bearer <SERVICE_TOKEN>" <BASE_URL>
#
# From this, you can parse out the service token and base URL.
token = <SERVICE_TOKEN>  # Fill this in.
base_url = <BASE_URL>  # Fill this in.

resp = requests.get(
    f"{base_url}/hello",
    params={"name": "Theodore"},
    headers={"Authorization": f"Bearer {token}"})

print(resp.text)
\`\`\`

## 4. Monitor the service

Navigate over to the Anyscale [**Services** page](https://console.anyscale.com/services) and check up on your deployment.

## Position in the stack

**Stage:** Foundations — this is a starting point.

- **Downstream:** [Deploy Llama 3.1 8b](../deploy_llama_3_8b/) — the same deploy loop, with a real LLM behind it
- **Journeys:** [Zero to Ray](../README.md#journeys), [Serve at scale](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).
`;export{e as default};
