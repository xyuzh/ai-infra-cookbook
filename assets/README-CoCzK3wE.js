const n=`# Train a model with Jax on GPUs

This example uses [JAX](https://github.com/jax-ml/jax) to train a small model on 16 T4 GPUs, orchestrated by [Ray Train](https://docs.ray.io/en/latest/train/train.html).

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Training | [JAX](https://github.com/jax-ml/jax) | model definition and training step |
| Orchestration | [Ray Train](https://docs.ray.io/en/latest/train/train.html) | distributed GPU worker orchestration for JAX |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## Install the Anyscale CLI

\`\`\`bash
pip install -U anyscale
anyscale login
\`\`\`

## Submit the job

Clone the example from GitHub.

\`\`\`bash
git clone https://github.com/anyscale/ai-infra-cookbook.git
cd ai-infra-cookbook/jax_training
\`\`\`

Submit the job with

\`\`\`bash
anyscale job submit -f job.yaml
\`\`\`

## Understanding the example

- This example installs a nightly version of Ray in the [Dockerfile](https://github.com/anyscale/ai-infra-cookbook/blob/main/jax_training/Dockerfile) because Ray Train GPU support for Jax is very recent.

## Position in the stack

**Stage:** Train

- **Related:** [Fine-Tuning LLM with Megatron-Bridge and Ray Train](../megatron_training/) — same Ray Train orchestration with Megatron instead of JAX
- **Journeys:** [Train and align](../README.md#journeys), [Zero to Ray](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).`;export{n as default};
