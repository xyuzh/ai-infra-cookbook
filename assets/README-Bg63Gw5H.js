const t=`# GRPO with SkyRL

This example uses [SkyRL](https://github.com/NovaSky-AI/SkyRL) to run GRPO training on the GSM8K dataset.

SkyRL is a modular and extensible reinforcement learning library for training large language models. It supports RL algorithms like PPO, GRPO, and DAPO, tool-use tasks, and multi-turn agentic workflows.

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| RL training | [SkyRL](https://github.com/NovaSky-AI/SkyRL) | modular RL library (PPO/GRPO/DAPO) driving the training loop |
| Rollouts | [vLLM](https://github.com/vllm-project/vllm) | rollout generation engines colocated with the trainer |
| Orchestration | [Ray](https://github.com/ray-project/ray) | placement groups colocating trainer and inference engines |
| Environment | [uv](https://github.com/astral-sh/uv) | resolves SkyRL's own pyproject.toml in an isolated env at job start |
| Dataset | [GSM8K](https://huggingface.co/datasets/openai/gsm8k) | math reasoning dataset providing the RL reward signal |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## Install the Anyscale CLI

\`\`\`bash
pip install -U anyscale
anyscale login
\`\`\`

## Submit the job

Clone the example from GitHub.

\`\`\`bash
git clone https://github.com/anyscale/examples.git
cd examples/skyrl
\`\`\`

Submit the job.

\`\`\`bash
anyscale job submit -f job.yaml
\`\`\`

## Understanding the example

- The entrypoint defined in the [job.yaml](https://github.com/anyscale/examples/blob/main/skyrl/job.yaml) first runs a script to download the GSM8K dataset and store it under \`/mnt/cluster_storage/data/gsm8k\`. The \`/mnt/cluster_storage/\` directory is an ephemeral shared filesystem attached to the cluster for the duration of the job (this ensures that all workers have access to the data).
- The main entrypoint, \`skyrl_train.entrypoints.main_base\`, is run using \`uv\`, which picks up the relevant [pyproject.toml](https://github.com/NovaSky-AI/SkyRL/blob/main/pyproject.toml) file in the SkyRL repository. That file specifies a Ray version, but we actually want to use the version of Ray used in the existing Ray cluster on Anyscale, which is why the \`uv run\` command includes the flag \`--with ray@http://localhost:9478/ray/ray-2.48.0-cp312-cp312-manylinux2014_x86_64.whl\`.
- In this example, we cannot set the \`working_dir\` argument in the job yaml file because \`uv\` will look for the appropriate \`pyproject.toml\` file in that working directory (and won't find it) instead of in the correct directory \`$HOME/SkyRL/skyrl-train\`.
- To store checkpoints in a persistent location, you can pass \`ckpt_path\` into the entrypoint. Read more about [Anyscale storage options](https://docs.anyscale.com/configuration/storage). This example saves checkpoints to a mounted shared filesystem via \`ckpt_path=/mnt/shared_storage/skyrl_checkpoints\`. To save checkpoints to blob storage, set \`ckpt_path=$ANYSCALE_ARTIFACT_STORAGE/skyrl_checkpoints\`. On AWS you will also need to modify the main entrypoint to include \`--with s3fs\` in the \`uv run\` command, and you'll need \`--with gcsfs\` on GCP.


## View the job

View the job in the [jobs tab](https://console.anyscale.com/jobs) of the Anyscale console.

## Position in the stack

**Stage:** Post-train

- **Upstream:** [Fine-Tuning LLM with Megatron-Bridge and Ray Train](../megatron_training/) — the SFT checkpoint arrives here for RL post-training
- **Downstream:** [Deploy Llama 3.1 8b](../deploy_llama_3_8b/) — the aligned checkpoint moves on to online serving
- **Journeys:** [The full LLM lifecycle](../README.md#journeys), [Train and align](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).
`;export{t as default};
