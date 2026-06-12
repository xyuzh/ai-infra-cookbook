const e=`# Serving a Model with Tensor Parallelism

This example explores a slightly more complex serving use case in which a model is deployed with various degrees of tensor parallelism (meaning the individual tensors are sharded across multiple GPUs). This example uses [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) along with [DeepSpeed](https://github.com/deepspeedai/DeepSpeed) and [Hugging Face Transformers](https://github.com/huggingface/transformers) to deploy GPT-2 across a couple GPUs as an Anyscale service.

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Serving | [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) | coordinator deployment fanning out to worker actors |
| Inference | [DeepSpeed](https://github.com/deepspeedai/DeepSpeed) | inter-GPU communication and inference within each sharded replica |
| Model | [Hugging Face Transformers](https://github.com/huggingface/transformers) | GPT-2 model weights and tokenizer |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## Install the Anyscale CLI

\`\`\`bash
pip install -U anyscale
anyscale login
\`\`\`

## Deploy the service

Clone the example from GitHub.

\`\`\`bash
git clone https://github.com/anyscale/ai-infra-cookbook.git
cd ai-infra-cookbook/serve_tensor_parallel
\`\`\`

Deploy the service.

\`\`\`bash
anyscale service deploy -f service.yaml
\`\`\`

## Understanding the example

- Each replica of the model is sharded across a number of \`InferenceWorker\` Ray actors. There are \`tensor_parallel_size\` (2 by default) of them per model replica. There is an additional coordinator actor called \`InferenceDeployment\`, which instantiates the \`InferenceWorker\` actors and queries them.
- For each model replica, the \`InferenceWorker\` actors use DeepSpeed to communicate and perform inference.
- Ray uses a [placement group](https://docs.ray.io/en/latest/ray-core/scheduling/placement-group.html) to reserve colocated resources for all of the actors for a given model. In the case of larger models that span multiple nodes, it is also possible to use placement groups to reserve resources across multiple nodes.

## Query the service

The \`anyscale service deploy\` command outputs a line that looks like  
\`\`\`text
curl -H "Authorization: Bearer <SERVICE_TOKEN>" <BASE_URL>
\`\`\`

From the output, you can extract the service token and base URL. Open [query.py](https://github.com/anyscale/ai-infra-cookbook/blob/main/serve_tensor_parallel/query.py) and add them to the appropriate fields.
\`\`\`python
token = <SERVICE_TOKEN> 
base_url = <BASE_URL> 
\`\`\`

Query the model  
\`\`\`bash
python query.py
\`\`\`

View the service in the [services tab](https://console.anyscale.com/services) of the Anyscale console.

## Shutdown 
 
Shutdown your Anyscale Service:
\`\`\`bash
anyscale service terminate -n tp-service
\`\`\`

## Position in the stack

**Stage:** Serve

- **Related:** [Deploy Llama 3.1 8b](../deploy_llama_3_8b/) — vLLM's built-in parallelism is the production version of what this example builds by hand
- **Journeys:** [Serve at scale](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).
`;export{e as default};
