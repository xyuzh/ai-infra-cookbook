const n=`# Fine-Tuning LLM with Megatron-Bridge and Ray Train

This example demonstrates how to run [Megatron-Bridge](https://github.com/NVIDIA-NeMo/Megatron-Bridge) training using [Ray Train](https://docs.ray.io/en/latest/train/train.html) for multi-GPU distributed training on Anyscale. It performs Supervised Fine-Tuning (SFT) on a Qwen/Qwen2.5-1.5B model.

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Training | [Megatron-Bridge](https://github.com/NVIDIA-NeMo/Megatron-Bridge) | Hugging Face ↔ Megatron checkpoint bridge and SFT training recipes |
| Training core | [Megatron-LM](https://github.com/NVIDIA/Megatron-LM) | tensor/pipeline-parallel transformer core underneath Megatron-Bridge |
| Kernels | [Transformer Engine](https://github.com/NVIDIA/TransformerEngine) | fused attention and GEMM kernels with BF16/FP8 support |
| Orchestration | [Ray Train](https://docs.ray.io/en/latest/train/train.html) | multi-node worker scheduling, env propagation, fault tolerance |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## Install the Anyscale CLI

\`\`\`bash
pip install -U anyscale
anyscale login
\`\`\`

## Submit the job

Clone the repository and submit the job using the provided YAML configuration:

\`\`\`bash
# Clone the repository
git clone https://github.com/anyscale/ai-infra-cookbook.git
cd ai-infra-cookbook/megatron_training

# Submit the job
anyscale job submit -f job.yaml --env HF_TOKEN=$HF_TOKEN
\`\`\`

**Note:** The \`--env HF_TOKEN=$HF_TOKEN\` flag passes your HuggingFace token to the job. Make sure you have \`HF_TOKEN\` set in your local environment.

## Understanding the example

- **Builds** a Docker image with Megatron-Bridge and dependencies (using [Dockerfile](https://github.com/anyscale/ai-infra-cookbook/blob/main/megatron_training/Dockerfile)).
- **Provisions** 8 GPUs (Tested working with 1 node with 8xH100 and 2 nodes with 4xL4 GPUs).
- **Runs** the distributed training script [llm_sft_ray_train_megatron.py](https://github.com/anyscale/ai-infra-cookbook/blob/main/megatron_training/llm_sft_ray_train_megatron.py), which wires 8 Ray Train workers into Megatron-Bridge SFT with tensor, pipeline, and data parallelism.

## Position in the stack

**Stage:** Train

- **Upstream:** [Pretraining text curation with Data-Juicer](../fineweb_dedup/) — a curated text corpus becomes SFT training data
- **Upstream:** [Billion-scale image captioning with vLLM](../image_processing/) — captioned image corpora feed multimodal training
- **Upstream:** [Streaming video curation with Ray Data](../video_curation/) — annotated clip datasets feed multimodal training
- **Downstream:** [GRPO post-training with SkyRL](../skyrl/) — the SFT checkpoint moves on to RL post-training
- **Related:** [Distributed JAX training on GPUs](../jax_training/) — same Ray Train orchestration with JAX instead of Megatron
- **Journeys:** [The full LLM lifecycle](../README.md#journeys), [Train and align](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).
`;export{n as default};
