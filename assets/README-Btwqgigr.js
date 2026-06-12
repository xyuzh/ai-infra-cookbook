const e=`# Deploy SGLang Multi-Node Inference

This example deploys [SGLang](https://github.com/sgl-project/sglang) for multi-node tensor-parallel inference using Ray on Anyscale. It runs in two modes: batch inference as an Anyscale job, or an autoscaling HTTP endpoint as an Anyscale service.

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Inference | [SGLang](https://github.com/sgl-project/sglang) | tensor- and pipeline-parallel inference engine |
| Serving | [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) | placement_group_bundles reserving GPUs across nodes; 1–4 replica autoscaling |
| Orchestration | [Ray](https://github.com/ray-project/ray) | actor wrapping SGLang for the offline batch driver |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## Install the Anyscale CLI

\`\`\`bash
pip install -U anyscale
anyscale login
\`\`\`

## Clone the example

\`\`\`bash
git clone https://github.com/anyscale/examples.git
cd examples/sglang_inference
\`\`\`

## Batch inference

Run batch inference as an Anyscale job:

\`\`\`bash
anyscale job submit -f job.yaml
\`\`\`

## Deploy as a service

Deploy as an HTTP endpoint with Ray Serve:

\`\`\`bash
anyscale service deploy -f service.yaml
\`\`\`

Wait for the service to be ready:

\`\`\`bash
anyscale service wait --name sglang-inference --state RUNNING --timeout-s 900
\`\`\`

## Query the service

The \`anyscale service deploy\` command outputs a line that looks like:

\`\`\`text
curl -H "Authorization: Bearer <SERVICE_TOKEN>" <SERVICE_URL>
\`\`\`

Set the environment variables from this output and query the model:

\`\`\`bash
export SERVICE_URL=<SERVICE_URL>
export SERVICE_TOKEN=<SERVICE_TOKEN>

pip install requests
python query.py
\`\`\`

## Understanding the example

- [serve.py](https://github.com/anyscale/examples/blob/main/sglang_inference/serve.py) uses Ray Serve's [\`placement_group_bundles\`](https://docs.ray.io/en/latest/serve/advanced-guides/replica-scheduling.html) to reserve GPUs across multiple nodes for tensor-parallel inference.
- [driver_offline.py](https://github.com/anyscale/examples/blob/main/sglang_inference/driver_offline.py) wraps SGLang in a Ray actor for batch inference.
- SGLang is imported inside the actor because it initializes CUDA and cannot be imported on CPU-only nodes.
- The default configuration uses TP=4, PP=2 across 2 nodes (8 GPUs per replica) on A10G GPUs. Other GPU types like L4, L40S, A100, and H100 would also work.
- The service autoscales from 1-4 replicas based on queue depth. See [AutoscalingConfig](https://docs.ray.io/en/latest/serve/api/doc/ray.serve.config.AutoscalingConfig.html) for tuning.
- The [Dockerfile](https://github.com/anyscale/examples/blob/main/sglang_inference/Dockerfile) installs CUDA toolkit and SGLang dependencies on top of the Ray base image.

**Environment variables:**

Override any variable at deploy/submit time with \`--env\`:

| Variable | Default | Description |
|----------|---------|-------------|
| \`MODEL_PATH\` | \`Qwen/Qwen3-1.7B\` | Hugging Face model ID |
| \`TP_SIZE\` | \`4\` | Tensor parallelism (GPUs per pipeline stage) |
| \`PP_SIZE\` | \`2\` | Pipeline parallelism (number of stages) |
| \`NUM_NODES_PER_REPLICA\` | \`2\` | Nodes per replica |

## Shutdown

Shutdown the service when done:

\`\`\`bash
anyscale service terminate --name sglang-inference
\`\`\`

## Position in the stack

**Stage:** Serve

- **Upstream:** [Deploy Llama 3.1 70b](../deploy_llama_3_1_70b/) — multi-GPU serving on one node is the step before spanning nodes
- **Downstream:** [Wide EP Fault Tolerance](../wide_ep_fault_tolerance/) — the next concern at this scale: surviving worker failures
- **Journeys:** [Serve at scale](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).
`;export{e as default};
