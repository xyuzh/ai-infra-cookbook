const n=`# Run Spark on Ray

This example demonstrates how to run a simple data processing example with [RayDP](https://github.com/ray-project/raydp), a library for running Spark on Ray.


## The stack

| Layer | Library | Role in this example |
|---|---|---|
| Data engine | [RayDP](https://github.com/ray-project/raydp) | runs Spark executors as Ray actors |
| Processing | [Apache Spark](https://github.com/apache/spark) | DataFrame API for the processing logic |
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
cd examples/spark_on_ray
\`\`\`

Submit the job.

\`\`\`bash
anyscale job submit -f job.yaml
\`\`\`


## Understanding the example

- This example is extremely simple and just uses basic Spark APIs. More configuration is required to read from blob stores like S3.

## Position in the stack

**Stage:** Foundations

- **Related:** [Large-Scale Text Data Processing with Data-Juicer](../fineweb_dedup/) — the Ray Data approach to distributed data processing
- **Journeys:** [Zero to Ray](../README.md#journeys)

Part of the [Open-Source Frontier Infra Stack](../README.md) — explore the
map in the [interactive explorer](../README.md#interactive-explorer).`;export{n as default};
