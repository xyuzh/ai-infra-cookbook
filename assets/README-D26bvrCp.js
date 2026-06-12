const n=`# Get started with jobs

Run discrete workloads in production such as batch inference, bulk embeddings generation, or model fine-tuning.

---

Anyscale jobs allow you to submit applications developed on workspaces to a standalone Ray cluster for execution. Built for production and designed to fit into your CI/CD pipeline, jobs ensure scalable and reliable performance.

Run your first job with the following instructions.

## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Compute | [Ray Core](https://docs.ray.io/en/latest/ray-core/walkthrough.html) | remote tasks fanned out across the cluster |
| Platform | [Anyscale](https://www.anyscale.com) | image build, compute provisioning, job/service management |

## 1. Install the Anyscale CLI

\`\`\`bash
pip install -U anyscale
anyscale login
\`\`\`

## 2. Submit a job

Clone the example from GitHub.

\`\`\`bash
git clone https://github.com/anyscale/ai-infra-cookbook.git
cd ai-infra-cookbook/job_hello_world
\`\`\`

The code in [main.py](https://github.com/anyscale/ai-infra-cookbook/blob/main/job_hello_world/main.py) runs 100 tasks that each take a number and square it.

\`\`\`python
import os
import ray


@ray.remote
def f(i):
    # This print statement is running in a separate worker process.
    print(f"The value of EXAMPLE_ENV_VAR is {os.environ['EXAMPLE_ENV_VAR']}.")
    return i ** 2


# Execute 100 tasks across the cluster.
results = ray.get([f.remote(i) for i in range(100)])
print(results)
\`\`\`

Also take a look at \`job.yaml\`. This file specifies the container image, compute resources, script entrypoint, and a few other fields.

Submit the job:

\`\`\`bash
anyscale job submit -f job.yaml
\`\`\`

## 3. Inspect the results

Navigate to the Anyscale [**Jobs** page](https://console.anyscale.com/jobs) and take a look at the results.

## Position in the stack

**Stage:** Foundations — this is a starting point.

- **Downstream:** [Large-Scale Text Data Processing with Data-Juicer](../fineweb_dedup/) — your first production-scale Ray Data pipeline
- **Journeys:** [Zero to Ray](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).
`;export{n as default};
