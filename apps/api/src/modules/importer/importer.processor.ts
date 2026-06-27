import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { PrismaService } from "../../prisma/prisma.service";

@Processor("tool-imports")
export class ImporterProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<{ importJobId: string }>) {
    await this.prisma.importJob.update({
      where: { id: job.data.importJobId },
      data: { status: "processing" }
    });

    await this.prisma.importJob.update({
      where: { id: job.data.importJobId },
      data: {
        status: "completed",
        processedRows: 0,
        metadata: {
          note: "Importer queue is wired. Extend this processor with CSV parsing or provider-specific API adapters."
        }
      }
    });
  }
}

